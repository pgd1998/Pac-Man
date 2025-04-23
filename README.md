# Pac-Man Game

A modern web-based implementation of the classic Pac-Man arcade game, featuring the original gameplay mechanics with a fresh design.

[Pac-Man Game live](https://pacman-5kz7.onrender.com/)

## Description

This project is a full-stack implementation of the iconic Pac-Man game. Players navigate through a maze, collecting pellets while avoiding ghosts. The game features power pellets that temporarily allow Pac-Man to eat the ghosts, authentic ghost AI behaviors, and a scoring system that keeps track of the player's performance.

## Features

- **Classic Pac-Man Gameplay**: Navigate through a maze, eat pellets, and avoid ghosts
- **Power Pellets**: Temporarily allows Pac-Man to eat ghosts for bonus points
- **Intelligent Ghost AI**: Each ghost (Blinky, Pinky, Inky, and Clyde) has a unique behavior pattern:
  - **Blinky (Red)**: Directly chases Pac-Man
  - **Pinky (Pink)**: Ambushes by targeting a position ahead of Pac-Man
  - **Inky (Cyan)**: Uses a flanking strategy combining Blinky's position and Pac-Man's position
  - **Clyde (Orange)**: Alternates between chasing Pac-Man and retreating based on distance
- **Lives System**: Multiple lives with visual feedback when a life is lost
- **Score Tracking**: Points for eating pellets, power pellets, and ghosts
- **Responsive Design**: Works on various screen sizes
- **User Authentication**: Save scores and track progress

## Technical Implementation

### Maze Implementation

The maze is implemented using a 2D matrix where:
- `1` represents walls
- `0` represents paths with pellets
- `2` represents empty paths (eaten pellets)
- `3` represents power pellets

```javascript
export const mazeLayout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1],
    ...
];
```

The maze is then rendered using CSS Grid, with each cell styled according to its content:
- Walls are rendered with a dark background
- Paths are rendered with a black background
- Pellets are rendered as small circles
- Power pellets are rendered as larger, pulsating circles

### Character Movement

Pac-Man and ghost movements are controlled through React state management. The game logic includes:
- Collision detection between Pac-Man and ghosts
- Pellet consumption
- Power pellet effects
- Ghost AI behaviors

### Tech Stack

#### Frontend
- **React**: Main UI framework
- **CSS3**: Styling, animations, and responsive design
- **React Router**: Navigation between game screens

#### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express**: Web application framework
- **MongoDB Atlas**: Cloud database for storing user data and high scores
- **Mongoose**: Object Data Modeling for MongoDB
- **JWT**: Authentication and session management
- **bcrypt**: Password hashing for secure user data

#### Development Tools
- **npm**: Package management
- **nodemon**: Development server with hot reloading

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (for database)

### Backend Setup
1. Clone the repository
```
git clone https://github.com/yourusername/pacman-game.git
cd pacman-game/back-end
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=port_number
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
```

4. Start the backend server
```
npm start
```

### Frontend Setup
1. Navigate to the frontend directory
```
cd ../front-end
```

2. Install dependencies
```
npm install
```

3. Start the frontend development server
```
npm start
```

## Deployment

The application is deployed using:
- **Frontend**: Render.com
- **Backend**: Render.com
- **Database**: MongoDB Atlas

## Future Enhancements

- Multiple maze levels
- Customizable ghost behaviors
- Leaderboard functionality
- Mobile touch controls optimization
- Sound effects and music


## Acknowledgements

- Inspired by the original Pac-Man game by Namco

## Contact

For questions or feedback, please reach out to poorvithgowda10@gmail.com