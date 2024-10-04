import React from "react";
import HeaderHome from "../components/headers/HomeHeader";
import "./HomePage.css"
const Home = () => {
    return (
        <div className="home-container">
            <HeaderHome/>
            <h1>Welcome to Pac-Man</h1>
            <p>
                Experience the classic arcade game Pac-Man! Navigate through the maze, 
                eat all the dots, and avoid the ghosts. Collect power pellets to turn 
                the tables on the ghosts and earn extra points. Click the button below 
                to start playing and relive the nostalgia of one of the most iconic 
                video games of all time.
            </p>
            {/* <button>Click to play</button> */}
        </div>
    );
}

export default Home;