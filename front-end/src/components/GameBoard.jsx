import React, { useState, useRef, useEffect } from 'react';
import { mazeLayout } from '../utils/maze.js';
import './GameBoard.css';
import PacMan from './PacMan.jsx';
import Ghost from './Ghost.jsx';
import { useNavigate } from 'react-router-dom';

export const GameBoard = ({ lives, setLives, score, setScore }) => {
    
    
    const [maze, setMaze] = useState(mazeLayout);
    const pacManInitialPosition = { x: 1, y: 1 };
    const [pacManPosition, setPacManPosition] = useState(pacManInitialPosition);
    const [pacManDirection, setPacManDirection] = useState('right');
    const [gameMode, setGameMode] = useState('chase');
    const [frightenedTimer, setFrightenedTimer] = useState(null);
    const [showLifeLost, setShowLifeLost] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [countdown, setCountdown] = useState(3); // State for countdown
    const [gameStarted, setGameStarted] = useState(false);



    const ghostInitialPositions = [
        { x: 5, y: 5, type: 'blinky', color: 'red' },
        { x: 6, y: 6, type: 'pinky', color: 'pink' },
        { x: 7, y: 7, type: 'inky', color: 'cyan' },
        { x: 8, y: 8, type: 'clyde', color: 'orange' }
    ];
    const [ghostPositions, setGhostPositions] = useState(ghostInitialPositions);
    const gameBoardRef = useRef(null);// Reference to the game board element
    const navigate = useNavigate();

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
            newMaze[position.y][position.x] = 0;
            setMaze(newMaze);
            setScore(prev => prev + 50);
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
        }, 200);
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
                        setScore(prev => prev + 200);
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
        }
    };

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
                        {row.map((cell, cellIndex) => (
                            <div
                                key={cellIndex}
                                className={`cell ${cell === 1 ? 'wall' : 'path'}`}
                            >
                                {cell === 0 && <div className='pellet'></div>}
                                {cell === 3 && <div className='power-pellet'></div>}
                            </div>
                        ))}
                    </div>
                ))}
                {showLifeLost && (
                    <div className="life-lost-overlay">
                        <p>Life Lost! Remaining Lives: {lives}</p>
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
                        gameStarted={gameStarted} // Pass gameStarted to Ghost component
                    />
                ))}
            </div>
        </div>
    );
};