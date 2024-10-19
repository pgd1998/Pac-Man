import React, { useEffect, useState } from "react";
import './Ghost.css';

const Ghost = ({ initialPosition, maze, onMove, type, gameBoardRef }) => {
    const [position, setPosition] = useState(initialPosition);
    const getRandomDirection = () => {
        const allDirections = ['up', 'down', 'left', 'right'];
        return allDirections[Math.floor(Math.random() * allDirections.length)];
    };
    const [direction, setDirection] = useState(getRandomDirection());
    const [cellSize, setCellSize] = useState(0);

    

    useEffect(() => {
        const calculateCellSize = () => {
            if (gameBoardRef.current) {
                const gameBoardWidth = gameBoardRef.current.clientWidth;
                const gameBoardHeight = gameBoardRef.current.clientHeight;
                const rows = maze.length;
                const cols = maze[0].length;
                const size = Math.min(gameBoardWidth / cols, gameBoardHeight / rows);
                setCellSize(size);
            }
        };

        calculateCellSize();
        window.addEventListener('resize', calculateCellSize);
        return () => window.removeEventListener('resize', calculateCellSize);
    }, [maze, gameBoardRef]);

    const isValidMove = (y, x) => {
        return y >= 0 && y < maze.length && x >= 0 && x < maze[0].length && maze[y][x] !== 1;
    };

    const moveGhost = () => {
        let newX = position.x;
        let newY = position.y;

        switch (direction) {
            case 'up':
                newY = Math.max(0, position.y - 1);
                break;
            case 'down':
                newY = Math.min(maze.length - 1, position.y + 1);
                break;
            case 'left':
                newX = Math.max(0, position.x - 1);
                break;
            case 'right':
                newX = Math.min(maze[0].length - 1, position.x + 1);
                break;
            default:
                break;
        }

        if (isValidMove(newY, newX)) {
            setPosition({ x: newX, y: newY });
            onMove({ x: newX, y: newY });
        } else {
            setDirection(getRandomDirection());
        }
    };

    useEffect(() => {
        const interval = setInterval(moveGhost, 300);
        return () => clearInterval(interval);
    }, [direction, position]);

    return (
        <div
            className={`ghost ghost-${type}`}
            style={{
                top: `${position.y * cellSize + cellSize * 0.15}px`,
                left: `${position.x * cellSize + cellSize * 0.15}px`,
                width: `${cellSize * 0.7}px`,
                height: `${cellSize * 0.7}px`
            }}
        >
        </div>
    );
};

export default Ghost;