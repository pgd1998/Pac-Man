import React, { useEffect, useState, useRef } from 'react';
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
    gameMode = 'chase' // 'chase' or 'frightened'
}) => {
    const [position, setPosition] = useState(initialPosition);
    const [cellSize, setCellSize] = useState(0);
    const [direction, setDirection] = useState('right');
    const pacmanPositionRef = useRef(pacmanPosition);
    const lastValidDirection = useRef(direction);

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

    // Check if a move is valid (i.e., not into a wall)
    const isValidMove = (y, x) => {
        return y >= 0 && y < maze.length && x >= 0 && x < maze[0].length && maze[y][x] !== 1;
    };

    // Get a random direction, optionally excluding a specific direction
    const getRandomDirection = (currentPos, excludeDirection) => {
        const possibleDirs = getPossibleDirections(currentPos);
        if (excludeDirection) {
            const filteredDirs = possibleDirs.filter(dir => dir !== excludeDirection);
            return filteredDirs[Math.floor(Math.random() * filteredDirs.length)] || possibleDirs[0];
        }
        return possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
    };

    // Calculate the Euclidean distance between two positions
    const calculateDistance = (pos1, pos2) => {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    };

    // Get all possible directions the ghost can move from a given position
    const getPossibleDirections = (pos) => {
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
            if (isValidMove(newY, newX)) {
                directions.push(dir);
            }
        });

        return directions;
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
    const getBestDirection = (currentPos, targetPos) => {
        const possibleDirs = getPossibleDirections(currentPos);
        const moves = {
            up: { x: 0, y: -1 },
            down: { x: 0, y: 1 },
            left: { x: -1, y: 0 },
            right: { x: 1, y: 0 }
        };

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
    };

    // Calculate the next move for the ghost based on the game mode and PacMan's position
    const calculateGhostMove = () => {
        if (gameMode === 'frightened') {
            // In frightened mode, maintain direction until hitting a wall
            const possibleDirs = getPossibleDirections(position);
            if (possibleDirs.includes(direction)) {
                return direction;
            }
            return getRandomDirection(position, getOppositeDirection(direction));
        }

        if (pacmanDirection === 'idle') {
            // Continue in the current direction if possible
            const possibleDirs = getPossibleDirections(position);
            if (possibleDirs.includes(direction)) {
                return direction;
            }
            // If current direction is blocked, choose a new random direction
            return getRandomDirection(position, getOppositeDirection(direction));
        }

        let targetPos;
        const currentPacmanPosition = pacmanPositionRef.current;

        switch (type) {
            case 'blinky':
                // Direct chase
                targetPos = currentPacmanPosition;
                break;

            case 'pinky':
                // Ambush 4 tiles ahead
                targetPos = { ...currentPacmanPosition };
                switch (pacmanDirection) {
                    case 'up':
                        targetPos.y -= 4;
                        break;
                    case 'down':
                        targetPos.y += 4;
                        break;
                    case 'left':
                        targetPos.x -= 4;
                        break;
                    case 'right':
                        targetPos.x += 4;
                        break;
                    default:
                        break;
                }
                break;

            case 'inky':
                // Flanking behavior
                if (blinkyPosition) {
                    targetPos = {
                        x: currentPacmanPosition.x + (currentPacmanPosition.x - blinkyPosition.x),
                        y: currentPacmanPosition.y + (currentPacmanPosition.y - blinkyPosition.y)
                    };
                } else {
                    targetPos = currentPacmanPosition;
                }
                break;

            case 'clyde':
                // Shy behavior
                const distanceToPacman = calculateDistance(position, currentPacmanPosition);
                if (distanceToPacman < 8) {
                    targetPos = cornerPositions.clyde;
                } else {
                    targetPos = currentPacmanPosition;
                }
                break;

            default:
                targetPos = currentPacmanPosition;
        }

        return getBestDirection(position, targetPos);
    };

    // Move the ghost based on the calculated direction
    const moveGhost = () => {
        const newDirection = calculateGhostMove();
        let newX = position.x;
        let newY = position.y;

        switch (newDirection) {
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
            setDirection(newDirection);
            lastValidDirection.current = newDirection;
            onMove({ x: newX, y: newY });
        } else {
            // If the move is not valid, choose a new direction that's not opposite
            const newRandomDirection = getRandomDirection(position, getOppositeDirection(direction));
            setDirection(newRandomDirection);
        }
    };

    // Set an interval to move the ghost periodically
    useEffect(() => {
        const interval = setInterval(moveGhost, gameMode === 'frightened' ? 400 : 300);
        return () => clearInterval(interval);
    }, [direction, position, gameMode]);

    return (
        <div
            className={`ghost ghost-${type} ${gameMode === 'frightened' ? 'frightened' : ''}`}
            style={{
                top: `${position.y * cellSize + cellSize * 0.15}px`,
                left: `${position.x * cellSize + cellSize * 0.15}px`,
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