import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import ChatBox from './components/ChatBox';
import Assignments from './components/Assignments';
import AssignmentTeacherPage from './components/AssignmentTeacherPage'; // Import the teacher page
import Login from './components/Login';
import TeacherLogin from './components/TeacherLogin'; // Import TeacherLogin component
import AssignmentList from './components/AssignmentList';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/teacher-assignments"
            element={<AssignmentTeacherPage />}
          />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/virtual-adult" element={<VirtualAdultPage />} />
          <Route
            path="/assignment-detail/:assignmentId"
            element={<AssignmentList />}
          />
          <Route path="/assignments" element={<AssignmentsPage />} />
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
