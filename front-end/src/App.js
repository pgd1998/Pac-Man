import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderHome from './components/headers/HomeHeader';
import GamePage from './pages/GamePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import GameOver from './pages/GameOverPage';
import UserGamePage from './pages/UserGamePage';
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
