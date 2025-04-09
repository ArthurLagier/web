import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Cam from './Components/Cam';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
      <nav>
        <Link to="/Home">Home</Link>
        <p></p>
        <Link to="/Cam">Comment ça marche</Link>
      </nav>
      <Routes>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Cam" element={<Cam/>}/>
      </Routes>
    </Router>
      </header>
    </div>
  );
}

export default App;
