import React, { useEffect, useState } from "react";
import './Ghost.css';

const CELL_SIZE = 40;

const Ghost = ({ initialPosition, maze, onMove, type }) => {
    const [position, setPosition] = useState(initialPosition);
    const [direction, setDirection] = useState(null);

    const getRandomDirection = () => {
        const allDirections = ['up', 'down', 'left', 'right'];
        return allDirections[Math.floor(Math.random() * allDirections.length)];
    };

    const isValidMove = (y, x) => {
        return y >= 0 && y < maze.length && x >= 0 && x < maze[0].length && maze[y][x] !== 1;
    };

    const moveGhost = () => {
        let newX = position.x;
        let newY = position.y;

        const newDirection = getRandomDirection();

        switch (newDirection) {
            case 'up':
                newY = position.y - 1;
                break;
            case 'down':
                newY = position.y + 1;
                break;
            case 'right':
                newX = position.x + 1;
                break;
            case 'left':
                newX = position.x - 1;
                break;
            default:
                break;
        }

        if (isValidMove(newY, newX)) {
            setPosition({ x: newX, y: newY });
            setDirection(newDirection);
            onMove({ x: newX, y: newY });
        }
    };

    useEffect(() => {
        const interval = setInterval(moveGhost, 300);
        return () => clearInterval(interval);
    }, [position]);

    return (
        <div
            className={`ghost ghost-${type}`}
            style={{
                top: `${position.y * CELL_SIZE + CELL_SIZE / 2 + 10}px`,
                left: `${position.x * CELL_SIZE + CELL_SIZE / 2 + 10}px`
            }}
        >
        </div>
    );
};

export default Ghost;