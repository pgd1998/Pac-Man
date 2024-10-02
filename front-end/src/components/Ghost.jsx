import React, { useEffect, useState } from "react";
import './Ghost.css';

const CELL_SIZE = 40;

const Ghost = ({initialPosition,maze,onMove}) => {
    const [position, setPosition] = useState(initialPosition);
    const [direction, setDirection] = useState(null);

    const getRandomDirection = () => {
        const allDirections = ['up', 'down', 'left', 'right'];
        return allDirections[Math.floor(Math.random()*allDirections.length)]
    }

    const moveGhost = () => {
        let newX = position.x;
        let newY = position.y;

        const newDirection = getRandomDirection();

        switch (newDirection) {
            case 'up':
                newY = Math.max(0, position.y - 1);
                break;
            case 'down':
                newY = Math.min(maze.length - 1, position.y + 1);
                break;
            case 'right':
                newX = Math.min(maze[0].length - 1, position.x + 1);
                break;
            case 'left':
                newX = Math.max(0, position.x - 1);
                break;
            default:
                break;
        }
        if (maze[newY][newX] !== 1) {
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
            className="ghost"
            style={{
                top: `${position.y * CELL_SIZE}px`,
                left:`${position.x * CELL_SIZE}px`
            }}
        >
        </div>
    )
}

export default Ghost;

