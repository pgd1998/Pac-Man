import React, { useState } from 'react';
import { mazeLayout } from '../utils/maze';
import './GameBoard.css';
import PacMan from './PacMan';
import Ghost from './Ghost';
import { useNavigate } from 'react-router-dom';
import UtilsHeader from './headers/UtilsHeader';

const GameBoard = () => {
    const [lives,setLives]=useState(2)
    const [maze, setMaze] = useState(mazeLayout);
    const pacManInitialPosition = { x: 1, y: 1 };
    const [pacManPosition, setPacManPosition] = useState(pacManInitialPosition);
    const ghostInitialPositions = [
        { x: 5, y: 5, type:'red' },
        { x: 6, y: 6, type:'green'},
        { x: 7, y: 7, type: 'blue' },
        {x:8,y:8,type:'purple'}
    ]
    const [ghostPositions, setGhostPositions] = useState(ghostInitialPositions);
    const [score, setScore] = useState(() => {
        const savedScore = sessionStorage.getItem('score');
        return savedScore ? parseInt(savedScore) : 0;
    });

    const navigate = useNavigate();
    
    const handlePacManMove = (newPosition) => {
        setPacManPosition(newPosition);
        checkCollisions(newPosition,ghostPositions);
    };

    const handleGhostMove = (index,newPosition) => {
        const newGhostPositions = [...ghostPositions]
        newGhostPositions[index] = {...newGhostPositions[index], ...newPosition};
        setGhostPositions(newGhostPositions);
        checkCollisions(pacManPosition, newGhostPositions);
    }

    const checkCollisions = (pacmanPos,ghostPosArray) => {
        ghostPosArray.forEach((ghostPos) => {
            if (pacmanPos.x === ghostPos.x && pacmanPos.y === ghostPos.y) {
                setLives((prevLives) => {
                    const newLives = prevLives - 1;
                    if (newLives < 0) {
                        navigate('/game-over')
                    }
                    return newLives
                });
                setPacManPosition(pacManInitialPosition);
                setGhostPositions(ghostInitialPositions);
            }
        })
    }

    const handlePelletConsumption = (newMaze,points) => {
        setScore((prevScore) => {
            const newScore = prevScore + points;
            sessionStorage.setItem('score', newScore);
            return newScore;
        });
        setMaze(newMaze);
    }

    return (
        <div className='game-board-container'>
            <UtilsHeader className="utils-header" lives={lives} score={score} />
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
                    <PacMan initialPosition={pacManInitialPosition} maze={maze} setMaze={handlePelletConsumption} onMove={handlePacManMove} />
                    {ghostInitialPositions.map((pos, index) => (
                        <Ghost key={index} initialPosition={pos} maze={maze} onMove={(newPos) => handleGhostMove(index, newPos)} type={pos.type} />
                    ))}
                </div>
        </div>);
}

export default GameBoard;