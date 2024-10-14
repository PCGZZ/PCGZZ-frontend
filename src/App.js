import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { SnackbarProvider } from 'notistack';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import ChatBox from './components/ChatBox';
import Assignments from './components/Assignments';
import AssignmentTeacherPage from './components/AssignmentTeacherPage';
import Login from './components/Login';
import TeacherLogin from './components/TeacherLogin';
import AssignmentDetail from './components/AssignmentDetail';
import { AssignmentsProvider } from './context/AssignmentsContext'; // Import AssignmentsProvider
import VoiceChatBox from './components/VoiceChatBox';
import './styles/App.css';
import StudentList from './components/StudentsList';
import { UserProvider } from './context/UserContext';

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
        </AssignmentsProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
