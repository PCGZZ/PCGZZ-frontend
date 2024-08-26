import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import ChatBox from './components/ChatBox'; // Import ChatBox
import Assignments from './components/Assignments';
import Login from './components/Login';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<Login />} />

          {/* Virtual Adult Page */}
          <Route
            path="/virtual-adult"
            element={(
              <>
                <Sidebar />
                <div className="main-layout">
                  <ChatBox />
                </div>
              </>
            )}
          />

          {/* Assignments Page */}
          <Route
            path="/assignments"
            element={(
              <>
                <Sidebar />
                <div className="main-layout">
                  <SearchBar />
                  <Assignments />
                </div>
              </>
            )}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
