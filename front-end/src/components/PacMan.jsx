// import React, { useState, useEffect,useRef } from "react";
// import './PacMan.css';


// const PacMan = ({initialPosition, maze,setMaze,onMove}) => {
//     const [position, setPosition] = useState(initialPosition);
//     const [direction, setDirection] = useState(null);
//     const gameBoardRef = useRef(null);
//     const [cellSize, setCellSize] = useState(0);
//     useEffect(() => {
//         const calculateCellSize = () => {
//             if (gameBoardRef.current) {
//                 const gameBoardWidth = gameBoardRef.current.clientWidth;
//                 const gameBoardHeight = gameBoardRef.current.clientHeight;
//                 const rows = maze.length;
//                 const cols = maze[0].length;
//                 const size = Math.min(gameBoardWidth / cols, gameBoardHeight / rows);
//                 setCellSize(size);
//             }
//         };

//         calculateCellSize();
//         window.addEventListener('resize', calculateCellSize);
//         return () => window.removeEventListener('resize', calculateCellSize);
//     }, [maze]);

//     const handleKeyDown = (e) => {
//         switch (e.key) {
//             case 'ArrowUp':
//                 setDirection('up')
//                 break;
//             case 'ArrowDown':
//                 setDirection('down')
//                 break;
//             case 'ArrowLeft':
//                 setDirection('left')
//                 break;
//             case 'ArrowRight':
//                 setDirection('right')
//                 break;
//             default:
//                 break;
//         }
//     };

//     const isValidMove = (y, x) => {
//         return maze[y][x] !== 1;
//     }
//     // In the switch here max(0) and min(maze.length) is used to overflow from the maze
//     const movePacMan=() => {
//         let newX = position.x;
//         let newY = position.y;

//         switch (direction) {
//             case 'up':
//                 newY = Math.max(0, position.y - 1);
//                 break;
//             case 'down':
//                 newY = Math.min(maze.length - 1, position.y + 1);
//                 break;
//             case 'left':
//                 newX = Math.max(0, position.x - 1);
//                 break;
//             case 'right':
//                 newX = Math.min(maze[0].length - 1, position.x + 1);
//                 break;
//             default:
//                 break;
//         }
//         // Checks if the new position is not a wall
//         // The 2 serves as a marker to indicate that a pellet was present in that cell 
//         // but has now been consumed.This helps in keeping track of which pellets have been eaten 
//         // and which are still available and also to avoid re-consumption.
//         if (isValidMove(newY,newX)) {
//             setPosition({ x: newX, y: newY });
//             onMove({ x: newX, y: newY });

//             if (maze[newY][newX] === 0) {
//                 const newMaze = maze.map((row, rowIndex) =>
//                     row.map((cell, cellIndex) => {
//                         if (rowIndex === newY && cellIndex === newX) {
//                             return 2;
//                         }
//                         return cell;
//                     })
//                 )
//                 setMaze(newMaze,5);
//             }
//         }
//     }

//     useEffect(() => {
//         window.addEventListener('keydown', handleKeyDown);
//         // reduce the value from 300 to 100 to increase the PacMan's speed 
//         const interval = setInterval(movePacMan, 250);
//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             clearInterval(interval)
//         };
//     }, [direction, position]);

//     return (
//         // top and left is enough to position pacman correctly
//         // within the gameboard and style is done here 
//         // so that every time pacman moves and re-renders the pacman (dot)
//         // will maintain the same size to fit inside the cell 
//         <div ref={gameBoardRef} className="game-board">
//             <div
//                 className="pacman"
//                 style={{
//                     top: `${position.y * cellSize}px`,
//                     left: `${position.x * cellSize}px`,
//                     width: `${cellSize * 0.8}px`, // Adjust size to fit within the cell
//                     height: `${cellSize * 0.8}px` // Adjust size to fit within the cell
//                 }}
//             ></div>
//         </div>
//     )
// }

// export default PacMan;

import React, { useState, useEffect } from "react";
import './PacMan.css';

const PacMan = ({ initialPosition, maze, setMaze, onMove, gameBoardRef, lives }) => {
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
    }, [lives]);

    const handleKeyDown = (e) => {
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
    };

    const isValidMove = (y, x) => {
        return maze[y][x] !== 1;
    };

    const movePacMan = () => {
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

            if (maze[newY][newX] === 0) {
                const newMaze = maze.map((row, rowIndex) =>
                    row.map((cell, cellIndex) => {
                        if (rowIndex === newY && cellIndex === newX) {
                            return 2;
                        }
                        return cell;
                    })
                );
                setMaze(newMaze, 5);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        const interval = setInterval(movePacMan, 150);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(interval);
        };
    }, [direction, position]);

    return (
        <div
            className="pacman"
            style={{
                top: `${position.y * cellSize + cellSize * 0.15}px`,
                left: `${position.x * cellSize + cellSize * 0.15}px`,
                width: `${cellSize * 0.7}px`,
                height: `${cellSize * 0.7}px`
            }}
        ></div>
    );
};

export default PacMan;