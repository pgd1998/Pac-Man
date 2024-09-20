import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Router>
        <Routes>
          {
            ["/", "/home"].map((Path2D, element)=>
              <Route path={path} element={<Home/>}/>
            )
          }
        </Routes>
      </Router>
      
      
    </div>
  );
}

export default App;
