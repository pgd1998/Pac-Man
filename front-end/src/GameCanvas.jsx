import React, { useEffect, useRef } from 'react';
import { mazeLayout } from '../utils/maze';

const CELL_SIZE = 40;

const GameBoard = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const drawMaze = () => {
            for (let y = 0; y < mazeLayout.length; y++) {
                for (let x = 0; x < mazeLayout[y].length; x++) {
                    if (mazeLayout[y][x] === 1) {
                        ctx.fillStyle = 'blue';
                        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                    } else {
                        ctx.fillStyle = 'black';
                        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                    }
                }
            }
        };

        const pacMan = {
            x: 1,
            y: 1,
            size: CELL_SIZE - 10
        };

        const ghosts = [
            { x: 5, y: 5, color: 'red' },
            { x: 10, y: 10, color: 'blue' },
            { x: 15, y: 15, color: 'pink' }
        ];

        const drawPacMan = () => {
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.arc(
                pacMan.x * CELL_SIZE + CELL_SIZE / 2,
                pacMan.y * CELL_SIZE + CELL_SIZE / 2,
                pacMan.size / 2,
                0.2 * Math.PI,
                1.8 * Math.PI
            );
            ctx.lineTo(pacMan.x * CELL_SIZE + CELL_SIZE / 2, pacMan.y * CELL_SIZE + CELL_SIZE / 2);
            ctx.fill();
        };

        const drawGhosts = () => {
            ghosts.forEach(ghost => {
                ctx.fillStyle = ghost.color;
                ctx.beginPath();
                ctx.arc(
                    ghost.x * CELL_SIZE + CELL_SIZE / 2,
                    ghost.y * CELL_SIZE + CELL_SIZE / 2,
                    pacMan.size / 2,
                    0,
                    2 * Math.PI
                );
                ctx.fill();
            });
        };

        const updateGame = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawMaze();
            drawPacMan();
            drawGhosts();
            requestAnimationFrame(updateGame);
        };

        updateGame();
    }, []);

    return (
        <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }}></canvas>
    );
};

export default GameBoard;