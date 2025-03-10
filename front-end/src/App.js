import './App.css';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GamePage from './pages/GamePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import GameOver from './pages/GameOverPage.jsx';
import UserGamePage from './pages/UserGamePage.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {
            ["/", "/home"].map((path, index)=>
              <Route key={ index} path={path} element={<Home/>}/>
            )
          }
          <Route path='/game' element={<GamePage />} />
          {/* TODO: Not using /user-game, it is just /game for everything */}
          <Route path='/user-game' element={ <UserGamePage/>}/>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/game-over' element={<GameOver/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
