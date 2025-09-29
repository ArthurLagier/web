import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home'
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <nav>
        <Link to="/Home">Home</Link>
      </nav>
      <Routes>
        <Route path="/Home" element={<Home/>}/>
      </Routes>
    </Router>
      </header>
    </div>
  );
}

export default App;