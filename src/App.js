import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import ChatBox from './components/ChatBox';
import Assignments from './components/Assignments';
import AssignmentTeacherPage from './components/AssignmentTeacherPage';
import Login from './components/Login';
import TeacherLogin from './components/TeacherLogin';
import AssignmentList from './components/AssignmentList';
import { AssignmentsProvider } from './context/AssignmentsContext'; // Import AssignmentsProvider
import './styles/App.css';
import NewAssignmentPage from './components/NewAssignmentPage'; // Import the NewAssignmentPage component

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
      <AssignmentsProvider>
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
            <Route
              path="/teacher-login"
              element={<ProtectedRoute component={TeacherLogin} />}
            />
            <Route
              path="/teacher-assignments"
              element={<ProtectedRoute component={AssignmentTeacherPage} />}
            />
            {/* Add the route for NewAssignmentPage */}
            <Route
              path="/new-assignment"
              element={<ProtectedRoute component={NewAssignmentPage} />}
            />
            <Route
              path="/assignment-detail/:assignmentId"
              element={<ProtectedRoute component={AssignmentList} />}
            />
          </Routes>
        </div>
      </AssignmentsProvider>
    </Router>
  );
}

export default App;
