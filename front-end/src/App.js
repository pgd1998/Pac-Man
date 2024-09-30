import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderHome from './components/headers/HomeHeader';
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
        </Routes>
      </Router>
      
      
    </div>
  );
}

export default App;
