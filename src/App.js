import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { SnackbarProvider } from 'notistack';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import Login from './components/Login';
import TeacherLogin from './components/TeacherLogin';
import AssignmentDetail from './components/AssignmentDetail';
import VoiceChatBox from './components/VoiceChatBox';
import VirtualAdultPage from './page/VirtualAdultPage';
import AssignmentsPage from './page/AssignmentsPage';
import './styles/App.css';
import StudentList from './components/StudentsList';
import { UserProvider } from './context/UserContext';

function ProtectedRoute({ component, ...args }) {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
}

function VoiceAdultPage() {
  return (
    <>
      <Sidebar />
      <div className="main-layout">
        <VoiceChatBox />
      </div>
    </>
  );
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
              path="/teacher-login"
              element={<ProtectedRoute component={TeacherLogin} />}
            />
            {/* Add the route for NewAssignmentPage */}
            <Route
              path="/assignment-detail/:id"
              element={<ProtectedRoute component={AssignmentDetail} />}
            />
            <Route
              path="/voice-adult/:submissionId"
              element={<ProtectedRoute component={VoiceAdultPage} />}
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
