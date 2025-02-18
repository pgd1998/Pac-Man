import React, { useState, useEffect, useCallback } from "react";
import './PacMan.css';

const PacMan = ({ 
    initialPosition, 
    maze, 
    setMaze, 
    onMove, 
    gameBoardRef, 
    lives,
    gameStarted 
}) => {
    const [position, setPosition] = useState(initialPosition);
    const [direction, setDirection] = useState(null);
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

    useEffect(() => {
        setPosition(initialPosition);
        setDirection(null);
        // setNextDirection(null);
    }, [lives]);

    // const isValidMove = useCallback((y, x) => {
    //     return y >= 0 && 
    //            y < maze.length && 
    //            x >= 0 && 
    //            x < maze[0].length && 
    //            maze[y][x] !== 1;
    // }, [maze]);
    const isValidMove = (y, x) => {
        return maze[y][x] !== 1;
    };

    const handleKeyDown = useCallback((e) => {
        console.log('Key pressed:', e.key); // Debugging log
        let newDirection = direction;

        switch (e.key) {
            case 'ArrowUp':
                setDirection('up');
                break;
            case 'ArrowDown':
                setDirection('down');
                break;
            case 'ArrowLeft':
                setDirection('left');
                break;
            case 'ArrowRight':
                setDirection('right');
                break;
            default:
                break;
        }

        // setNextDirection(newDirection);
        console.log('Next direction:', newDirection); // Debugging log
    }, [direction]);

    const movePacMan = useCallback(() => {
        if (!gameStarted) return;
        console.log('Moving PacMan'); // Debugging log
        let newX = position.x;
        let newY = position.y;

        // Check if the next direction is valid before changing
        // if (nextDirection) {
        //     let nextX = newX;
        //     let nextY = newY;

        //     switch (nextDirection) {
        //         case 'up':
        //             nextY = position.y - 1;
        //             break;
        //         case 'down':
        //             nextY = position.y + 1;
        //             break;
        //         case 'left':
        //             nextX = position.x - 1;
        //             break;
        //         case 'right':
        //             nextX = position.x + 1;
        //             break;
        //         default:
        //             break;
        //     }

        //     if (isValidMove(nextY, nextX)) {
        //         setDirection(nextDirection);
        //         setNextDirection(null);
        //         newX = nextX;
        //         newY = nextY;
        //     }
        // }

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
            onMove({ x: newX, y: newY }, direction);

            // Handle pellet consumption
            if (maze[newY][newX] === 0) {
                const newMaze = maze.map((row, rowIndex) =>
                    row.map((cell, cellIndex) => {
                        if (rowIndex === newY && cellIndex === newX) {
                            return 2; // Mark as eaten
                        }
                        return cell;
                    })
                );
                setMaze(newMaze, 10); // Regular pellet points
            }
            // Handle power pellet consumption
            else if (maze[newY][newX] === 3) {
                const newMaze = maze.map((row, rowIndex) =>
                    row.map((cell, cellIndex) => {
                        if (rowIndex === newY && cellIndex === newX) {
                            return 2; // Mark as eaten
                        }
                        return cell;
                    })
                );
                setMaze(newMaze, 50); // Power pellet points
            }
        }
    }, [direction, maze, onMove, position, isValidMove, setMaze,gameStarted]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        const interval = setInterval(movePacMan, 200); // Slightly faster movement
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(interval);
        };
    }, [direction, position]);

    const getRotation = () => {
        switch (direction) {
            case 'up':
                return 90;
            case 'down':
                return -90;
            case 'left':
                return 0;
            case 'right':
                return 180;
            default:
                return 0;
        }
    };

    return (
        <div
            className={`pacman moving`}
            style={{
                top: `${position.y * cellSize + cellSize * 0.15}px`,
                left: `${position.x * cellSize + cellSize * 0.15}px`,
                width: `${cellSize * 0.7}px`,
                height: `${cellSize * 0.7}px`,
                transform: `rotate(${getRotation()}deg)`
            }}
        ></div>
    );
};

export default PacMan;