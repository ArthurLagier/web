import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home';
import Login from './pages/Login';       // <= Tu dois avoir ces fichiers
import Register from './pages/Register'; // <= dans src/pages/

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <nav>
            {/* Liens visibles en haut de page */}
            <Link to="/">Home</Link> |{" "}
            <Link to="/login">Login</Link> |{" "}
            <Link to="/register">Register</Link>
          </nav>

          {/* Déclaration des Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </header>
      </Router>
    </div>
  );
}

export default App;