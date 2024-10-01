import React, { useState } from 'react';
import { mazeLayout } from '../utils/maze';
import './GameBoard.css';
import PacMan from './PacMan';
import Ghost from './Ghost';

const GameBoard = () => {
    const [maze, setMaze] = useState(mazeLayout);
    const pacManInitialPosition = { x: 1, y: 1 };
    const [pacManPosition, setPacManPosition] = useState(pacManInitialPosition);
    const ghostInitialPositions = [
        { x: 5, y: 5 },
        { x: 10, y: 10 },
        { x: 15, y: 15 }
        
    ]

    const handlePacManMove = (newPosition) => {
        setPacManPosition(newPosition);
        checkCollisions(newPosition);
    }

    const checkCollisions = (pacmanPos) => {
        ghostInitialPositions.forEach((ghostPos) => {
            if (pacmanPos.x === ghostPos.x && pacmanPos.y === ghostPos.y) {
                alert('Game Over')
                // TODO: properly handle by adding 2 more lives
            }
        })
    }

    return (
        <div className='game-board'>
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
            <PacMan initialPosition={pacManInitialPosition} maze={maze} setMaze={setMaze} onMove={ handlePacManMove} />
            {ghostInitialPositions.map((pos, index) => (
                <Ghost key={index} initialPosition={pos} maze={maze}/>
            ))}
        </div>);
}

export default GameBoard;