import React from 'react';
import { mazeLayout } from '../utils/maze';
import './GameBoard.css';
import PacMan from './PacMan';

const GameBoard = () => {
    return (
        <div className='game-board'>
            {mazeLayout.map((row, rowIndex) => (
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
            <PacMan />
        </div>);
}

export default GameBoard;