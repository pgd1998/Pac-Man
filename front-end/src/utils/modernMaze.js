// modernMaze.js - Updated with improved ghost house exit logic
// Legend:
// 0 = path with pellet
// 1 = wall
// 2 = empty path (no pellet)
// 3 = power pellet
// 4 = ghost house area
// 5 = ghost house door (special path for ghosts only)

export const modernMazeLayout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 5, 1, 1, 5, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 5, 4, 4, 4, 4, 4, 4, 5, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 5, 4, 4, 4, 4, 4, 4, 5, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 5, 1, 1, 1, 1, 1, 1, 5, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Function to determine wall types for visual differentiation
export const getWallType = (maze, y, x) => {
    if (maze[y][x] !== 1) return '';
    
    // Check adjacent cells (handling edge cases)
    const hasTop = y > 0 ? maze[y - 1][x] === 1 : false;
    const hasBottom = y < maze.length - 1 ? maze[y + 1][x] === 1 : false;
    const hasLeft = x > 0 ? maze[y][x - 1] === 1 : false;
    const hasRight = x < maze[0].length - 1 ? maze[y][x + 1] === 1 : false;
    
    // Count connections
    const connections = [hasTop, hasBottom, hasLeft, hasRight].filter(Boolean).length;
    
    // Determine wall type based on connections
    if (connections <= 1) {
        return 'end-piece';
    } else if ((hasTop && hasBottom && !hasLeft && !hasRight) || 
               (hasLeft && hasRight && !hasTop && !hasBottom)) {
        return connections === 2 ? 'horizontal' : 'vertical';
    } else if (connections >= 3) {
        return 'junction';
    } else {
        return 'corner';
    }
};

// Enhanced initial positions for better gameplay
export const enhancedInitialPositions = {
    pacMan: { x: 10, y: 15 }, // Center-bottom area
    ghosts: [
        { x: 8, y: 9, type: 'blinky', color: 'red' },    // Inside ghost house
        { x: 9, y: 9, type: 'pinky', color: 'pink' },   // Inside ghost house
        { x: 10, y: 9, type: 'inky', color: 'cyan' },     // Inside ghost house
        { x: 11, y: 9, type: 'clyde', color: 'orange' }  // Inside ghost house
    ]
};

// Modified version of the isValidMove function to handle ghost house exits
export const isValidMove = (maze, y, x) => {
    // Check if coordinates are within bounds
    if (y < 0 || y >= maze.length || x < 0 || x >= maze[0].length) {
        return false;
    }
    
    // Check cell type
    const cellType = maze[y][x];
    
    // Allow movement to:
    // - Paths (0)
    // - Empty paths (2)
    // - Power pellets (3)
    // - Ghost house (4)
    // - Ghost house doors (5)
    return cellType !== 1; // Only walls (1) are invalid
};

// Function to create a visual effect when a pellet is consumed
export const createPelletEffect = (maze, y, x) => {
    // Check if the coordinates are valid
    if (y < 0 || y >= maze.length || x < 0 || x >= maze[0].length) {
        console.error("Invalid coordinates for createPelletEffect:", y, x);
        return { maze, points: 0 };
    }
    
    // Check if it's a pellet or power pellet
    if (maze[y][x] === 0 || maze[y][x] === 3) {
        // Create a copy of the maze
        const newMaze = maze.map(row => [...row]);
        
        // Replace the pellet with an empty path
        newMaze[y][x] = 2;
        
        // Return the updated maze and points
        return {
            maze: newMaze,
            points: maze[y][x] === 0 ? 10 : 50
        };
    }
    
    // If it's not a pellet, return the original maze with no points
    return {
        maze,
        points: 0
    };
};

// Function to check if all pellets are consumed
export const areAllPelletsConsumed = (maze) => {
    // Check if there are any pellets or power pellets left
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 0 || maze[y][x] === 3) {
                return false;
            }
        }
    }
    
    return true;
};

// Function to check if a position is in the ghost house
export const isInGhostHouse = (maze, y, x) => {
    // Check if coordinates are within bounds
    if (y < 0 || y >= maze.length || x < 0 || x >= maze[0].length) {
        return false;
    }
    
    return maze[y][x] === 4;
};

// Function to find the nearest ghost house exit
export const findNearestGhostHouseExit = (maze, position) => {
    const exits = [];
    
    // Scan the maze for ghost house doors (type 5)
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[0].length; x++) {
            if (maze[y][x] === 5) {
                exits.push({ x, y });
            }
        }
    }
    
    // Find the nearest exit
    let nearestExit = null;
    let minDistance = Infinity;
    
    exits.forEach(exit => {
        const distance = Math.sqrt(
            Math.pow(exit.x - position.x, 2) + 
            Math.pow(exit.y - position.y, 2)
        );
        
        if (distance < minDistance) {
            minDistance = distance;
            nearestExit = exit;
        }
    });
    
    return nearestExit;
};