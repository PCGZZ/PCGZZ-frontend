import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import Assignments from './components/Assignments';
import ChatBox from './components/ChatBox';// Import ChatBox component
import './styles/App.css';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main-layout">
          <Routes>
            {/* Conditionally render the SearchBar only on non-Virtual Adult pages */}
            <Route
              path="/virtual-adult"
              element={
                <ChatBox />
              }
            />
            <Route
              path="/assignments"
              element={(
                <>
                  <SearchBar />
                  <Assignments />
                </>
              )}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
