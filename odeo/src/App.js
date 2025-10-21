import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home';
import Login from './pages/Login';     
import Register from './pages/Register';
import GameDetails from './pages/GameDetails';
import NewGame from './pages/NewGame';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <nav>
            {/* Liens visibles en haut de page */}
            <Link to="/">Home</Link> |{" "}
            <Link to="/login">Login</Link> |{" "}
            <Link to="/register">Register</Link> |{" "}
            <Link to="/new-game">Ajouter un jeu</Link>
          </nav>

          {/* Déclaration des Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-game" element={<NewGame />} />
            <Route path="/game/:id" element={<GameDetails />} />
          </Routes>
        </header>
      </Router>
    </div>
  );
}

export default App;