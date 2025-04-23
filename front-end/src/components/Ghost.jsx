import React, { useEffect, useState, useRef, useCallback } from 'react';
import { isValidMove as mazeIsValidMove } from '../utils/modernMaze.js';
import './Ghost.css';

const Ghost = ({
    initialPosition,
    maze,
    onMove,
    type,
    gameBoardRef,
    pacmanPosition,
    pacmanDirection,
    blinkyPosition,
    gameMode = 'chase', // 'chase' or 'frightened'
    gameStarted
}) => {
    const [position, setPosition] = useState(initialPosition);
    const [cellSize, setCellSize] = useState(0);
    const [direction, setDirection] = useState('right');
    const pacmanPositionRef = useRef(pacmanPosition);
    const lastValidDirection = useRef(direction);

    // For debugging - log initial props
    useEffect(() => {
        console.log(`Ghost ${type} initialized with:`, {
            initialPosition,
            gameStarted,
            gameMode
        });
    }, []);

    // Update the ref whenever pacmanPosition changes
    useEffect(() => {
        pacmanPositionRef.current = pacmanPosition;
    }, [pacmanPosition]);

    // Corner positions for scatter mode
    const cornerPositions = {
        blinky: { x: maze[0].length - 1, y: 0 }, // top-right
        pinky: { x: 0, y: 0 }, // top-left
        inky: { x: maze[0].length - 1, y: maze.length - 1 }, // bottom-right
        clyde: { x: 0, y: maze.length - 1 } // bottom-left
    };

    // Calculate the size of each cell based on the game board dimensions
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

    // Check if a move is valid - allow movement through ghost house (cell type 4)
    const checkValidMove = useCallback((y, x) => {
        // Allow movement if coordinates are in bounds
        if (y < 0 || y >= maze.length || x < 0 || x >= maze[0].length) {
            return false;
        }
        
        // Allow movement through ghost house and paths, but not walls
        return maze[y][x] !== 1; // Allow if not a wall (1)
    }, [maze]);

    // Get all possible directions the ghost can move from a given position
    const getPossibleDirections = useCallback((pos) => {
        const directions = [];
        const moves = {
            up: { x: 0, y: -1 },
            down: { x: 0, y: 1 },
            left: { x: -1, y: 0 },
            right: { x: 1, y: 0 }
        };

        Object.entries(moves).forEach(([dir, move]) => {
            const newY = pos.y + move.y;
            const newX = pos.x + move.x;
            
            // Only add direction if it's a valid move
            if (checkValidMove(newY, newX)) {
                directions.push(dir);
            }
        });

        return directions;
    }, [checkValidMove]);

    // Get a random direction, optionally excluding a specific direction
    const getRandomDirection = useCallback((currentPos, excludeDirection) => {
        const possibleDirs = getPossibleDirections(currentPos);
        
        // No possible directions? Return current direction as fallback
        if (possibleDirs.length === 0) {
            console.log(`Ghost ${type}: No possible directions!`);
            return direction;
        }
        
        if (excludeDirection) {
            const filteredDirs = possibleDirs.filter(dir => dir !== excludeDirection);
            if (filteredDirs.length > 0) {
                return filteredDirs[Math.floor(Math.random() * filteredDirs.length)];
            }
        }
        
        return possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
    }, [getPossibleDirections, direction, type]);

    // Calculate the Euclidean distance between two positions
    const calculateDistance = (pos1, pos2) => {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    };

    // Get the opposite direction of a given direction
    const getOppositeDirection = (dir) => {
        const opposites = {
            up: 'down',
            down: 'up',
            left: 'right',
            right: 'left'
        };
        return opposites[dir];
    };

    // Get the best direction to move towards a target position
    const getBestDirection = useCallback((currentPos, targetPos) => {
        const possibleDirs = getPossibleDirections(currentPos);
        const moves = {
            up: { x: 0, y: -1 },
            down: { x: 0, y: 1 },
            left: { x: -1, y: 0 },
            right: { x: 1, y: 0 }
        };

        // No possible directions? Return current direction as fallback
        if (possibleDirs.length === 0) {
            console.log(`Ghost ${type}: No possible directions for best path!`);
            return direction;
        }

        let bestDir = possibleDirs[0];
        let bestDistance = Infinity;

        // Filter out the opposite of current direction to prevent back-and-forth
        const oppositeDir = getOppositeDirection(direction);
        const filteredDirs = possibleDirs.filter(dir => dir !== oppositeDir);

        // Use filtered directions if available, otherwise use all possible directions
        const directionsToCheck = filteredDirs.length > 0 ? filteredDirs : possibleDirs;

        directionsToCheck.forEach(dir => {
            const move = moves[dir];
            const newPos = {
                x: currentPos.x + move.x,
                y: currentPos.y + move.y
            };
            const distance = calculateDistance(newPos, targetPos);
            
            if (distance < bestDistance) {
                bestDistance = distance;
                bestDir = dir;
            }
        });

        return bestDir;
    }, [direction, getPossibleDirections, type]);

    // Calculate the next move for the ghost based on the game mode and PacMan's position
    const calculateGhostMove = useCallback(() => {
        // Ghost house exit logic - if in ghost house, prioritize moving upward to exit
        if (maze[position.y][position.x] === 4) {
            console.log(`Ghost ${type} trying to exit ghost house`);
            const possibleDirs = getPossibleDirections(position);
            if (possibleDirs.includes('up')) {
                return 'up'; // Prioritize moving up to exit
            }
        }

        if (gameMode === 'frightened') {
            // In frightened mode, move randomly
            console.log(`Ghost ${type} in frightened mode`);
            return getRandomDirection(position);
        }

        if (!pacmanPositionRef.current || pacmanDirection === 'idle') {
            // Continue in current direction if possible
            const possibleDirs = getPossibleDirections(position);
            if (possibleDirs.includes(direction)) {
                return direction;
            }
            // Otherwise random direction
            return getRandomDirection(position, getOppositeDirection(direction));
        }

        let targetPos;
        const currentPacmanPosition = pacmanPositionRef.current;

        switch (type) {
            case 'blinky':
                // Direct chase
                targetPos = {...currentPacmanPosition};
                break;

            case 'pinky':
                // Ambush 4 tiles ahead
                targetPos = { ...currentPacmanPosition };
                switch (pacmanDirection) {
                    case 'up':
                        targetPos.y = Math.max(0, targetPos.y - 4);
                        break;
                    case 'down':
                        targetPos.y = Math.min(maze.length-1, targetPos.y + 4);
                        break;
                    case 'left':
                        targetPos.x = Math.max(0, targetPos.x - 4);
                        break;
                    case 'right':
                        targetPos.x = Math.min(maze[0].length-1, targetPos.x + 4);
                        break;
                    default:
                        break;
                }
                break;

            case 'inky':
                // Flanking behavior
                if (blinkyPosition) {
                    // Vector from Blinky to Pacman
                    const vectorX = currentPacmanPosition.x - blinkyPosition.x;
                    const vectorY = currentPacmanPosition.y - blinkyPosition.y;
                    
                    // Target is twice that vector from Pacman
                    targetPos = {
                        x: Math.min(Math.max(0, currentPacmanPosition.x + vectorX), maze[0].length-1),
                        y: Math.min(Math.max(0, currentPacmanPosition.y + vectorY), maze.length-1)
                    };
                } else {
                    targetPos = {...currentPacmanPosition};
                }
                break;

            case 'clyde':
                // Shy behavior
                const distanceToPacman = calculateDistance(position, currentPacmanPosition);
                if (distanceToPacman < 8) {
                    targetPos = {...cornerPositions.clyde};
                } else {
                    targetPos = {...currentPacmanPosition};
                }
                break;

            default:
                targetPos = {...currentPacmanPosition};
        }

        console.log(`Ghost ${type} targeting:`, targetPos);
        return getBestDirection(position, targetPos);
    }, [gameMode, getPossibleDirections, getRandomDirection, pacmanDirection, position, type, blinkyPosition, cornerPositions.clyde, direction, getBestDirection, maze]);

    // Move the ghost based on the calculated direction
    const moveGhost = useCallback(() => {
        if (!gameStarted) {
            console.log(`Ghost ${type} not moving - game not started`);
            return;
        }
        
        console.log(`Ghost ${type} calculating move from ${position.x},${position.y}`);
        const newDirection = calculateGhostMove();
        let newX = position.x;
        let newY = position.y;
    
        // Calculate new position based on direction
        switch (newDirection) {
            case 'up': newY = Math.max(0, position.y - 1); break;
            case 'down': newY = Math.min(maze.length - 1, position.y + 1); break;
            case 'left': newX = Math.max(0, position.x - 1); break;
            case 'right': newX = Math.min(maze[0].length - 1, position.x + 1); break;
            default: break;
        }
    
        // Check if move is valid
        if (checkValidMove(newY, newX)) {
            console.log(`Ghost ${type} moving to: ${newX}, ${newY} (direction: ${newDirection})`);
            setPosition({ x: newX, y: newY });
            setDirection(newDirection);
            lastValidDirection.current = newDirection;
            onMove({ x: newX, y: newY });
        } else {
            // If the move is not valid, choose a new direction
            console.log(`Ghost ${type} blocked at: ${newX}, ${newY}`);
            const newRandomDirection = getRandomDirection(position, getOppositeDirection(direction));
            setDirection(newRandomDirection);
        }
    }, [gameStarted, calculateGhostMove, position, direction, maze, onMove, getRandomDirection, checkValidMove, type]);
    
    // Set an interval to move the ghost periodically
    useEffect(() => {
        console.log(`Ghost ${type} effect triggered. gameStarted: ${gameStarted}`);
        
        if (!gameStarted) return;
        
        console.log(`Setting up movement interval for ghost ${type}`);
        const interval = setInterval(moveGhost, gameMode === 'frightened' ? 400 : 350);
        
        return () => {
            console.log(`Clearing interval for ghost ${type}`);
            clearInterval(interval);
        };
    }, [moveGhost, gameMode, gameStarted, type]);

    // Center the ghost in the cell
    const topPosition = position.y * cellSize + (cellSize - cellSize * 0.7) / 2;
    const leftPosition = position.x * cellSize + (cellSize - cellSize * 0.7) / 2;

    return (
        <div
            className={`ghost ghost-${type} ${gameMode === 'frightened' ? 'frightened' : ''}`}
            style={{
                top: `${topPosition}px`,
                left: `${leftPosition}px`,
                width: `${cellSize * 0.7}px`,
                height: `${cellSize * 0.7}px`
            }}
        >
            <div className="ghost-body"></div>
            <div className="ghost-eyes"></div>
        </div>
    );
};

export default Ghost;

/*
Ghost Behaviors
Blinky (Red Ghost):

Behavior: Directly chases PacMan.
Target Position: PacMan's current position.
Reason: Blinky's strategy is to follow PacMan directly, so it needs to know where PacMan is at all times.
Pinky (Pink Ghost):

Behavior: Ambushes PacMan by targeting a position 4 tiles ahead of PacMan's current direction.
Target Position: A position 4 tiles ahead of PacMan's current direction.
Reason: Pinky's strategy is to cut off PacMan by predicting where PacMan will be in the near future. It needs PacMan's direction to calculate this target position.
Inky (Cyan Ghost):

Behavior: Uses a combination of Blinky's position and PacMan's position to create a flanking maneuver.
Target Position: A position that is a vector sum of PacMan's position and the vector from Blinky to PacMan.
Reason: Inky's strategy is to create a pincer movement with Blinky. It needs both PacMan's position and Blinky's position to calculate this target position.
Clyde (Orange Ghost):

Behavior: Alternates between chasing PacMan and retreating to a corner based on the distance to PacMan.
Target Position: PacMan's position if far away; a corner position if close.
Reason: Clyde's strategy is to act unpredictably by sometimes chasing PacMan and sometimes retreating. It needs PacMan's position to determine the distance and decide its behavior.
Code Explanation
calculateGhostMove Function
This function determines the next move for the ghost based on its type and the game mode.

Blinky: Targets PacMan's current position.
Pinky: Targets a position 4 tiles ahead of PacMan's current direction.
Inky: Targets a position based on both PacMan's and Blinky's positions.
Clyde: Targets PacMan's position if far away, or a corner position if close.
*/ 