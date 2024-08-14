import React from "react";

import {
  BrowserRouter as Router, // Ensure this is the only declaration of Router
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import "./App.css";

// Home Component
function Home() {
  const navigate = useNavigate();

  const navigateToAbout = () => {
    navigate("/about");
  };

  return (
    <div className="App-content">
      <h2>Psychology tool!</h2>
      <button type="button" onClick={navigateToAbout}>
        Go to Second Page
      </button>
    </div>
  );
}

// About Component
function About() {
  return (
    <div className="App-content">
      <h2>Second Page</h2>
      <p>This is the Second page content.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
