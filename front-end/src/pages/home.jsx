import React from "react";
import HeaderHome from "../components/headers/HomeHeader.jsx";
import "./HomePage.css"
const Home = () => {
    return (
        <div className="home-container">
            <div className="top">
                <h1>Welcome to Pac-Man</h1>
                <HeaderHome />
                <h6>Sign up to save your score and appear on the leaderboard.</h6>
            </div>
                <p>
                Experience the classic arcade game Pac-Man! Navigate through the maze, 
                eat all the dots, and avoid the ghosts. Collect power pellets to turn 
                the tables on the ghosts and earn extra points. 
                <br />
                <br/>
                Developed by Poorvith Gowda
            </p>
        </div>
    );
}

export default Home;