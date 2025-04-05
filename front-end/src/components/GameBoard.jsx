import React, { useState, useRef, useEffect } from 'react';
import { modernMazeLayout, getWallType, enhancedInitialPositions, areAllPelletsConsumed } from '../utils/modernMaze.js';
import './GameBoard.css';
import PacMan from './PacMan.jsx';
import Ghost from './Ghost.jsx';
import { useNavigate } from 'react-router-dom';

export const GameBoard = ({ lives, setLives, score, setScore }) => {
    // Use the modern maze layout instead of the original
    const [maze, setMaze] = useState(modernMazeLayout);
    // Use enhanced initial positions
    const pacManInitialPosition = enhancedInitialPositions.pacMan;
    const [pacManPosition, setPacManPosition] = useState(pacManInitialPosition);
    const [pacManDirection, setPacManDirection] = useState('right');
    const [gameMode, setGameMode] = useState('chase');
    const [frightenedTimer, setFrightenedTimer] = useState(null);
    const [showLifeLost, setShowLifeLost] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [gameStarted, setGameStarted] = useState(false);
    const [animateScore, setAnimateScore] = useState(false);
    const [lastScorePosition, setLastScorePosition] = useState({ x: 0, y: 0 });
    const [lastScoreValue, setLastScoreValue] = useState(0);

    // Use enhanced ghost positions
    const ghostInitialPositions = enhancedInitialPositions.ghosts;
    const [ghostPositions, setGhostPositions] = useState(ghostInitialPositions);
    const gameBoardRef = useRef(null);
    const navigate = useNavigate();
    const scoreRef = useRef(score);

    // Debug log the initial state
    useEffect(() => {
        console.log('GameBoard initialized with:', {
            pacManInitialPosition,
            ghostInitialPositions,
            maze: 'Maze data (too large to log)'
        });
    }, []);

    // Update score ref when score changes
    useEffect(() => {
        scoreRef.current = score;
    }, [score]);

    // Function to reset positions of PacMan and ghosts
    const resetPositions = () => {
        setIsResetting(true);
        setPacManPosition(pacManInitialPosition);
        setGhostPositions([...ghostInitialPositions]);
        setPacManDirection('right');
        setGameMode('chase');
        if (frightenedTimer) clearTimeout(frightenedTimer);
        
        setTimeout(() => {
            setIsResetting(false);
        }, 10);
    };

    const handlePacManMove = (newPosition, direction) => {
        if (!isResetting && gameStarted) {
            setPacManPosition(newPosition);
            setPacManDirection(direction);
            checkCollisions(newPosition, ghostPositions);
            checkPowerPellet(newPosition);
        }
    };

    const checkPowerPellet = (position) => {
        if (maze[position.y][position.x] === 3) {
            setGameMode('frightened');
            if (frightenedTimer) clearTimeout(frightenedTimer);
            
            const timer = setTimeout(() => {
                setGameMode('chase');
            }, 10000);
            setFrightenedTimer(timer);
            
            const newMaze = [...maze];
            newMaze[position.y][position.x] = 2; // Change to empty path
            setMaze(newMaze);
            
            // Set the score animation position and value
            setLastScorePosition({ x: position.x, y: position.y });
            setLastScoreValue(50);
            setScore(prev => prev + 50);
            
            // Animate score
            setAnimateScore(true);
            setTimeout(() => setAnimateScore(false), 1000);
        }
    };

    const handleGhostMove = (index, newPosition) => {
        if (!isResetting && !showLifeLost && gameStarted) {
            const newGhostPositions = [...ghostPositions];
            newGhostPositions[index] = { ...newGhostPositions[index], ...newPosition };
            setGhostPositions(newGhostPositions);
            checkCollisions(pacManPosition, newGhostPositions);
        }
    };

    const handleLifeLost = () => {
        setShowLifeLost(true);
        resetPositions();
        
        setTimeout(() => {
            setShowLifeLost(false);
        }, 1500); // Longer animation to show message
    };

    const checkCollisions = (pacmanPos, ghostPosArray) => {
        if (isResetting) return;

        const pacmanBounds = {
            left: pacmanPos.x,
            right: pacmanPos.x + 1,
            top: pacmanPos.y,
            bottom: pacmanPos.y + 1
        };

        ghostPosArray.forEach((ghostPos) => {
            const ghostBounds = {
                left: ghostPos.x,
                right: ghostPos.x + 1,
                top: ghostPos.y,
                bottom: ghostPos.y + 1
            };

            const horizontalOverlap = pacmanBounds.left < ghostBounds.right && pacmanBounds.right > ghostBounds.left;
            const verticalOverlap = pacmanBounds.top < ghostBounds.bottom && pacmanBounds.bottom > ghostBounds.top;

            if (horizontalOverlap && verticalOverlap) {
                if (gameMode === 'frightened') {
                    // Ghost is eaten
                    const index = ghostPositions.findIndex(g => g.x === ghostPos.x && g.y === ghostPos.y);
                    if (index !== -1) {
                        const newGhostPositions = [...ghostPositions];
                        newGhostPositions[index] = { ...ghostInitialPositions[index] };
                        setGhostPositions(newGhostPositions);
                        
                        // Set the score animation position and value
                        setLastScorePosition({ x: ghostPos.x, y: ghostPos.y });
                        setLastScoreValue(200);
                        
                        // Update score and animate
                        setScore(prev => prev + 200);
                        setAnimateScore(true);
                        setTimeout(() => setAnimateScore(false), 1000);
                    }
                } else {
                    // Pac-Man is caught
                    setLives(prevLives => {
                        const newLives = prevLives - 1;
                        if (newLives < 0) {
                            navigate('/game-over');
                            return 0;
                        }
                        handleLifeLost();
                        return newLives;
                    });
                }
            }
        });
    };

    const handlePelletConsumption = (newMaze, points) => {
        if (!isResetting && gameStarted) {
            setScore((prevScore) => {
                const newScore = prevScore + points;
                sessionStorage.setItem('score', newScore);
                return newScore;
            });
            setMaze(newMaze);
            
            // Set the score animation position and value for regular pellets
            if (points > 0) {
                setLastScorePosition({ x: pacManPosition.x, y: pacManPosition.y });
                setLastScoreValue(points);
                setAnimateScore(true);
                setTimeout(() => setAnimateScore(false), 500);
            }
        }
    };

    // Check if all pellets are consumed - win condition
    useEffect(() => {
        if (gameStarted && areAllPelletsConsumed(maze)) {
            console.log("All pellets consumed - Game Won!");
            // You could navigate to a victory screen or reset the level
            // For now, we'll just go to game over
            navigate('/game-over');
        }
    }, [maze, gameStarted, navigate]);

    useEffect(() => {
        return () => {
            if (frightenedTimer) clearTimeout(frightenedTimer);
        };
    }, [frightenedTimer]);

    // Countdown logic
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setGameStarted(true);
        }
    }, [countdown]);

    // Calculate cell positions for the floating score
    const getCellPosition = (x, y) => {
        if (!gameBoardRef.current) return { top: '50%', left: '50%' };
        
        const boardRect = gameBoardRef.current.getBoundingClientRect();
        const cellWidth = boardRect.width / maze[0].length;
        const cellHeight = boardRect.height / maze.length;
        
        const top = `${y * cellHeight + cellHeight / 2}px`;
        const left = `${x * cellWidth + cellWidth / 2}px`;
        
        return { top, left };
    };

    return (
        <div className='game-board-container'>
            {!gameStarted && (
                <div className="countdown-overlay">
                    <div className="countdown">{countdown}</div>
                </div>
            )}
            <div ref={gameBoardRef} className='game-board'>
                {maze.map((row, rowIndex) => (
                    <div key={rowIndex} className='row'>
                        {row.map((cell, cellIndex) => {
                            // Determine wall type for visual differentiation
                            const wallType = cell === 1 ? getWallType(maze, rowIndex, cellIndex) : '';
                            
                            // Determine cell class based on cell type
                            let cellClass = '';
                            if (cell === 1) {
                                cellClass = `wall ${wallType}`;
                            } else if (cell === 4) {
                                cellClass = 'ghost-house';
                            } else if (cell === 5) {
                                cellClass = 'ghost-house-door';
                            } else {
                                cellClass = 'path';
                            }
                            
                            return (
                                <div
                                    key={cellIndex}
                                    className={`cell ${cellClass}`}
                                    data-type={cell} // Add data attribute for CSS targeting
                                >
                                    {cell === 0 && <div className='pellet'></div>}
                                    {cell === 3 && <div className='power-pellet'></div>}
                                </div>
                            );
                        })}
                    </div>
                ))}
                {showLifeLost && (
                    <div className="life-lost-overlay">
                        <div className="life-lost-content">
                            <div className="life-lost-icon">💔</div>
                            <p>Life Lost!</p>
                            <div className="remaining-lives">Remaining Lives: {lives}</div>
                        </div>
                    </div>
                )}
                <PacMan
                    initialPosition={pacManInitialPosition}
                    maze={maze}
                    setMaze={handlePelletConsumption}
                    onMove={handlePacManMove}
                    gameBoardRef={gameBoardRef}
                    lives={lives}
                    gameStarted={gameStarted}
                />
                {ghostPositions.map((pos, index) => (
                    <Ghost
                        key={index}
                        initialPosition={pos}
                        maze={maze}
                        onMove={(newPos) => handleGhostMove(index, newPos)}
                        type={pos.type}
                        gameBoardRef={gameBoardRef}
                        pacmanPosition={pacManPosition}
                        pacmanDirection={pacManDirection}
                        blinkyPosition={ghostPositions[0]}
                        gameMode={gameMode}
                        gameStarted={gameStarted}
                    />
                ))}
                
                {/* Floating score animation */}
                {animateScore && (
                    <div 
                        className="floating-score"
                        style={{
                            top: getCellPosition(lastScorePosition.x, lastScorePosition.y).top,
                            left: getCellPosition(lastScorePosition.x, lastScorePosition.y).left,
                        }}
                    >
                        +{lastScoreValue}
                    </div>
                )}
            </div>
        </div>
    );
};