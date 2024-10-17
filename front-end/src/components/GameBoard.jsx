import React, { useState, useRef, useEffect } from 'react';
import { mazeLayout } from '../utils/maze';
import './GameBoard.css';
import PacMan from './PacMan';
import Ghost from './Ghost';
import { useNavigate } from 'react-router-dom';
import useUpdate from '../hooks/useUpdate';

const GameBoard = ({ lives, setLives, score, setScore }) => {
    const [maze, setMaze] = useState(mazeLayout);
    const pacManInitialPosition = { x: 1, y: 1 };
    const [pacManPosition, setPacManPosition] = useState(pacManInitialPosition);
    const ghostInitialPositions = [
        { x: 5, y: 5, type: 'red' },
        { x: 6, y: 6, type: 'green' },
        { x: 7, y: 7, type: 'blue' },
        { x: 8, y: 8, type: 'purple' }
    ];
    const [ghostPositions, setGhostPositions] = useState(ghostInitialPositions);
    const gameBoardRef = useRef(null);

    const navigate = useNavigate();

    const handlePacManMove = (newPosition) => {
        setPacManPosition(newPosition);
        checkCollisions(newPosition, ghostPositions);
    };

    const handleGhostMove = (index, newPosition) => {
        const newGhostPositions = [...ghostPositions];
        newGhostPositions[index] = { ...newGhostPositions[index], ...newPosition };
        setGhostPositions(newGhostPositions);
        checkCollisions(pacManPosition, newGhostPositions);
    };

    const checkCollisions = (pacmanPos, ghostPosArray) => {
        const collisionThreshold = 0.5; // Adjust this value as needed

        ghostPosArray.forEach((ghostPos) => {
            const distance = Math.sqrt(
                Math.pow(pacmanPos.x - ghostPos.x, 2) + Math.pow(pacmanPos.y - ghostPos.y, 2)
            );

            if (distance < collisionThreshold) {
                setLives((prevLives) => {
                    const newLives = prevLives - 1;
                    if (newLives < 0) {
                        
                        navigate('/game-over');
                    }
                    return newLives;
                });

                // Only reset positions if there are lives left
                if (lives > 0) {
                    setPacManPosition(pacManInitialPosition);
                    setGhostPositions(ghostInitialPositions);
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
        const calculateCellSize = () => {
            if (gameBoardRef.current) {
                const gameBoardWidth = gameBoardRef.current.clientWidth;
                const gameBoardHeight = gameBoardRef.current.clientHeight;
                const rows = maze.length;
                const cols = maze[0].length;
                const size = Math.min(gameBoardWidth / cols, gameBoardHeight / rows);
                document.documentElement.style.setProperty('--cell-size', `${size}px`);
            }
        };

        calculateCellSize();
        window.addEventListener('resize', calculateCellSize);
        return () => window.removeEventListener('resize', calculateCellSize);
    }, [maze]);

    return (
        <div className='game-board-container'>
            <div ref={gameBoardRef} className='game-board'>
                {maze.map((row, rowIndex) => (
                    <div key={rowIndex} className='row'>
                        {row.map((cell, cellIndex) => (
                            <div
                                key={cellIndex}
                                className={`cell ${cell === 1 ? 'wall' : 'path'}`}>
                                {cell === 0 && <div className='pellet'></div>}
                            </div>
                        ))}
                    </div>
                ))}
                <PacMan
                    initialPosition={pacManInitialPosition}
                    maze={maze}
                    setMaze={handlePelletConsumption}
                    onMove={handlePacManMove}
                    gameBoardRef={gameBoardRef}
                    lives={lives} // Pass the lives prop
                />
                {ghostInitialPositions.map((pos, index) => (
                    <Ghost
                        key={index}
                        initialPosition={pos}
                        maze={maze}
                        onMove={(newPos) => handleGhostMove(index, newPos)}
                        type={pos.type}
                        gameBoardRef={gameBoardRef}
                    />
                ))}
            </div>
        </div>
    );
};

export default GameBoard;