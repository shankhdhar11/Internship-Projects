import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import History from './components/History';
import RandomStringGenerator from './components/RandomStringGenerator';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="logo">
              StringMaster
            </Link>
            
            <div className="nav-links">
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                Home
              </NavLink>
              <NavLink 
                to="/generator" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                Generator
              </NavLink>
              <NavLink 
                to="/history" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                History
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                About
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<RandomStringGenerator />} />
            <Route path="/history" element={<History />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={
              <div className="not-found">
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <Link to="/" className="home-btn">Go Back Home</Link>
              </div>
            } />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>© 2023 React Router App | Task 3 - Client Side Routing</p>
          <p className="footer-sub">Built with React Router DOM</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;