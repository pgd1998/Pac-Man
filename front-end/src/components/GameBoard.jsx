import React, { useState, useRef, useEffect } from 'react';
import { mazeLayout } from '../utils/maze';
import './GameBoard.css';
import PacMan from './PacMan';
import Ghost from './Ghost';
import { useNavigate } from 'react-router-dom';

export const GameBoard = ({ lives, setLives, score, setScore }) => {
    const [maze, setMaze] = useState(mazeLayout);
    const pacManInitialPosition = { x: 1, y: 1 };
    const [pacManPosition, setPacManPosition] = useState(pacManInitialPosition);
    const [pacManDirection, setPacManDirection] = useState('right');
    const [gameMode, setGameMode] = useState('chase'); // 'chase' or 'frightened'
    const [frightenedTimer, setFrightenedTimer] = useState(null);
    const [showLifeLost, setShowLifeLost] = useState(false);
    
    const ghostInitialPositions = [
        { x: 5, y: 5, type: 'blinky', color: 'red' },
        { x: 6, y: 6, type: 'pinky', color: 'pink' },
        { x: 7, y: 7, type: 'inky', color: 'cyan' },
        { x: 8, y: 8, type: 'clyde', color: 'orange' }
    ];
    const [ghostPositions, setGhostPositions] = useState(ghostInitialPositions);
    const gameBoardRef = useRef(null);
    const navigate = useNavigate();

    const handlePacManMove = (newPosition, direction) => {
        setPacManPosition(newPosition);
        setPacManDirection(direction);
        checkCollisions(newPosition, ghostPositions);
        checkPowerPellet(newPosition);
    };

    const checkPowerPellet = (position) => {
        if (maze[position.y][position.x] === 3) { // 3 represents a power pellet
            setGameMode('frightened');
            
            if (frightenedTimer) clearTimeout(frightenedTimer);

            const timer = setTimeout(() => {
                setGameMode('chase');
            }, 10000); // 10 seconds of frightened mode
            setFrightenedTimer(timer);
            
            // Update maze to remove eaten power pellet
            const newMaze = [...maze];
            newMaze[position.y][position.x] = 0;
            setMaze(newMaze);
            
            // Add points for power pellet
            setScore(prev => prev + 50);
        }
    };

    const handleGhostMove = (index, newPosition) => {
        const newGhostPositions = [...ghostPositions];
        newGhostPositions[index] = { ...newGhostPositions[index], ...newPosition };
        setGhostPositions(newGhostPositions);
        checkCollisions(pacManPosition, newGhostPositions);
    };

    const checkCollisions = (pacmanPos, ghostPosArray) => {
        const collisionThreshold = 0.5;
        ghostPosArray.forEach((ghostPos) => {
            const distance = Math.sqrt(
                Math.pow(pacmanPos.x - ghostPos.x, 2) + Math.pow(pacmanPos.y - ghostPos.y, 2)
            );

            if (distance < collisionThreshold) {
                if (gameMode === 'frightened') {
                    // Ghost is eaten
                    const index = ghostPositions.findIndex(g => g.x === ghostPos.x && g.y === ghostPos.y);
                    if (index !== -1) {
                        const newGhostPositions = [...ghostPositions];
                        newGhostPositions[index] = { ...ghostInitialPositions[index] };
                        setGhostPositions(newGhostPositions);
                        setScore(prev => prev + 200); // Points for eating a ghost
                    }
                } else {
                    // Pac-Man is caught
                    setLives((prevLives) => {
                        const newLives = prevLives - 1;
                        if (newLives < 0) {
                            navigate('/game-over');
                        }
                        return newLives;
                    });

                    if (lives > 0) {
                        setShowLifeLost(true);
                        setTimeout(() => {
                            setShowLifeLost(false);
                            setPacManPosition(pacManInitialPosition);
                            setGhostPositions(ghostInitialPositions);
                            setPacManDirection('right');
                            setGameMode('chase');
                            if (frightenedTimer) clearTimeout(frightenedTimer);
                        }, 2000); // 2 seconds pause
                    }
                }
            }
        });
    };

    const handlePelletConsumption = (newMaze, points) => {
        setScore((prevScore) => {
            const newScore = prevScore + points;
            sessionStorage.setItem('score', newScore);
            return newScore;
        });
        setMaze(newMaze);
    };

    useEffect(() => {
        return () => {
            if (frightenedTimer) clearTimeout(frightenedTimer);
        };
    }, [frightenedTimer]);

    return (
        <div className='game-board-container'>
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
                        blinkyPosition={ghostPositions[0]} // First ghost is Blinky
                        gameMode={gameMode}
                    />
                ))}
            </div>
        </div>
    );
};