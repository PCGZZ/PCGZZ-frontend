import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import Assignments from './components/Assignments';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main-layout">
          <SearchBar />
          <Routes>
            <Route path="/assignments" element={<Assignments />} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
