import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import ChatBox from './components/ChatBox';
import Assignments from './components/Assignments';
import AssignmentTeacherPage from './components/AssignmentTeacherPage'; // Import the teacher page
import Login from './components/Login';
import TeacherLogin from './components/TeacherLogin'; // Import TeacherLogin component
import AssignmentList from './components/AssignmentList';
import './styles/App.css';

function ProtectedRoute({ component, ...args }) {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/virtual-adult"
            element={<ProtectedRoute component={VirtualAdultPage} />}
          />
          <Route
            path="/assignments"
            element={<ProtectedRoute component={AssignmentsPage} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
