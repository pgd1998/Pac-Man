import React, { useState } from 'react';
import { mazeLayout } from '../utils/maze';
import './GameBoard.css';
import PacMan from './PacMan';
import Ghost from './Ghost';

const GameBoard = () => {
    const [maze, setMaze] = useState(mazeLayout);
    const ghostInitialPositions = [
        { x: 5, y: 5 },
        { x: 10, y: 10 },
        { x: 15, y: 15 }
        
    ]


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
            <PacMan maze={maze} setMaze={setMaze} />
            {ghostInitialPositions.map((pos, index) => (
                <Ghost key={index} initialPosition={pos} maze={maze}/>
            ))}
        </div>);
}

export default GameBoard;