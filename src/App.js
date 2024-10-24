import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { SnackbarProvider } from 'notistack';
import Sidebar from './components/Sidebar';
import Login from './page/Login';
import AssignmentDetail from './components/AssignmentDetail';
import VirtualAdultPage from './page/VirtualAdultPage';
import AssignmentsPage from './page/AssignmentsPage';
import TranscriptPage from './page/TranscriptPage';
import VoiceVirtualAdultPage from './page/VoiceVirtualAdultPage';
import './styles/App.css';
import StudentList from './components/StudentsList';
import { UserProvider } from './context/UserContext';

function ProtectedRoute({ component, ...args }) {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
}

function StudentListPage() {
  return (
    <>
      <Sidebar />
      <div className="main-layout">
        <StudentList />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <SnackbarProvider autoHideDuration={5000} />
      <UserProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/virtual-adult/:assignmentId"
              element={<ProtectedRoute component={VirtualAdultPage} />}
            />
            <Route
              path="/assignments"
              element={<ProtectedRoute component={AssignmentsPage} />}
            />
            <Route
              path="/assignment-detail/:id"
              element={<ProtectedRoute component={AssignmentDetail} />}
            />
            <Route
              path="/transcript/:submissionId"
              element={<ProtectedRoute component={TranscriptPage} />}
            />
            <Route
              path="/voice-adult/:assignmentId"
              element={<ProtectedRoute component={VoiceVirtualAdultPage} />}
            />
            <Route
              path="/user-list"
              element={<ProtectedRoute component={StudentListPage} />}
            />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
