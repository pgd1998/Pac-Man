import React, { useState, useEffect } from "react";
import { mazeLayout } from "../utils/maze";
import './PacMan.css';

const PacMan = () => {
    const [position, setPosition] = useState({ x: 1, y: 1 });
    const [direction, setDirection] = useState(null);

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'ArrowUp':
                setDirection('up')
                break;
            case 'ArrowDown':
                setDirection('down')
                break;
            case 'ArrowLeft':
                setDirection('left')
                break;
            case 'ArrowRight':
                setDirection('right')
                break;
            default:
                break;
        }
    }

    const movePacMan=() => {
        let newX = position.x;
        let newY = position.y;

        switch (direction) {
            case 'up':
                newY = Math.max(0, position.y - 1);
                break;
            case 'down':
                newY = Math.min(mazeLayout.length - 1, position.y + 1);
                break;
            case 'left':
                newX = Math.max(0, position.x - 1);
                break;
            case 'right':
                newX = Math.min(mazeLayout[0].length - 1, position.x + 1);
                break;
        }
        if (mazeLayout[newY][newX] != 1) {
            setPosition({x:newX,y:newY})
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        const interval = setInterval(movePacMan, 200);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(interval)
        };
    }, [direction, position]);

    return (
        <div 
            className="pacman"
            style={{
                top: `${position.y * 20}px`,
                left:`${position.x * 20}px`
        }}></div>
    )
}

export default PacMan;