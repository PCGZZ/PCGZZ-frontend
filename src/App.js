import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import ChatBox from './components/ChatBox';
import Assignments from './components/Assignments';
import Login from './components/Login';
import AssignmentList from './components/AssignmentList'; // Ensure you have this import
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/virtual-adult" element={<VirtualAdultPage />} />
          <Route path="/assignments" element={<AssignmentsPage />} />
          <Route
            path="/assignment-detail/:assignmentId"
            element={<AssignmentList />}
          />
        </Routes>
      </div>
    </Router>
  );
}

function VirtualAdultPage() {
  return (
    <>
      <Sidebar />
      <div className="main-layout">
        <ChatBox />
      </div>
    </>
  );
}

function AssignmentsPage() {
  return (
    <>
      <SearchBar />
      <Sidebar />
      <div className="main-layout">
        <Assignments />
      </div>
    </>
  );
}

export default App;
