import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';


import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <header className="App-header">
            <nav>
           <Link to="/login">Login</Link> |{" "}
            <Link to="/register">Register</Link> |{" "}
            </nav>

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </header>
        </Router>
      </div>
    </AuthProvider>
  );
}
export default App;