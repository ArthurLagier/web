import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';

import Home from './Components/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import GameDetails from './pages/GameDetails';
import NewGame from './pages/NewGame';
import Footer from './Components/Footer';
import Contact from './pages/Contact';
import Navbar from './pages/Navbar'; // 👈 IMPORT DU NOUVEAU COMPOSANT

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          
          <div className="site-content">
            
            {/* 👇 ON REMPLACE L'ANCIEN HEADER PAR ÇA */}
            <Navbar /> 

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/new-game" element={<NewGame />} />
              <Route path="/game/:id" element={<GameDetails />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>

          </div>

          <Footer />

        </Router>
      </div>
    </AuthProvider>
  );
}
export default App;