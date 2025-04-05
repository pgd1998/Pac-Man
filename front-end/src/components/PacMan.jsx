import React, { useState, useEffect, useCallback, useReducer } from "react";
import { isValidMove as mazeIsValidMove, createPelletEffect } from '../utils/modernMaze.js';
import './PacMan.css';

const initialState = (initialPosition) => ({
    position: initialPosition,
    direction: null,
});

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSITION':
            return { ...state, position: action.payload };
        case 'SET_DIRECTION':
            return { ...state, direction: action.payload };
        case 'RESET':
            return initialState(action.payload);
        default:
            return state;
    }
};

const PacMan = ({ 
    initialPosition, 
    maze, 
    setMaze, 
    onMove, 
    gameBoardRef, 
    lives,
    gameStarted 
}) => {
    const [state, dispatch] = useReducer(reducer, initialPosition, initialState);
    const { position, direction } = state;
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
        dispatch({ type: 'RESET', payload: initialPosition });
    }, [lives, initialPosition]);

    // Rename the local function to avoid conflict with imported function
    const checkValidMove = useCallback((y, x) => {
        return y >= 0 && y < maze.length && x >= 0 && x < maze[0].length && maze[y][x] !== 1;
    }, [maze]);

    const handleKeyDown = useCallback((e) => {
        console.log('Key pressed:', e.key); // Debugging log

        switch (e.key) {
            case 'ArrowUp':
                dispatch({ type: 'SET_DIRECTION', payload: 'up' });
                break;
            case 'ArrowDown':
                dispatch({ type: 'SET_DIRECTION', payload: 'down' });
                break;
            case 'ArrowLeft':
                dispatch({ type: 'SET_DIRECTION', payload: 'left' });
                break;
            case 'ArrowRight':
                dispatch({ type: 'SET_DIRECTION', payload: 'right' });
                break;
            default:
                break;
        }
    }, []);

    const movePacMan = useCallback(() => {
        if (!gameStarted) return;
        console.log('Moving PacMan'); // Debugging log
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

        // Use the checkValidMove function here instead of the imported function
        if (checkValidMove(newY, newX)) {
            // Move Pac-Man
            dispatch({ type: 'SET_POSITION', payload: { x: newX, y: newY } });
            onMove({ x: newX, y: newY }, direction);
        
            // Handle pellet consumption
            const result = createPelletEffect(maze, newY, newX);
            if (result && result.points > 0) {
                setMaze(result.maze, result.points);
            }
        }
    }, [direction, maze, onMove, position, checkValidMove, setMaze, gameStarted]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        const interval = setInterval(movePacMan, 300); // Slightly faster movement
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(interval);
        };
    }, [handleKeyDown, movePacMan]);

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

    // Update the return statement in PacMan.jsx
return (
    <div
        className={`pacman moving`}
        style={{
            // Improved positioning calculation to center Pacman in cells
            top: `${position.y * cellSize + (cellSize - cellSize * 0.7) / 2}px`,
            left: `${position.x * cellSize + (cellSize - cellSize * 0.7) / 2}px`,
            width: `${cellSize * 0.7}px`,
            height: `${cellSize * 0.7}px`,
            transform: `rotate(${getRotation()}deg)`
        }}
    ></div>
);
};

export default PacMan;