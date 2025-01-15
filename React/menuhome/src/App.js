import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home';
import Button from './Components/Button';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/Home">Home</Link>;
        <Link to="/Button">Simpson</Link>;
      </nav>
      <Routes>
        <Route path="/Home" element={<Home/>}/>;
        <Route path="/Button" element={<Button/>}/>;
      </Routes>
    </Router>
  );
}

export default App