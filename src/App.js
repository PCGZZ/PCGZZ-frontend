import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

import VirtualAdultPage from './page/VirtualAdultPage';
import AssignmentsPage from './page/AssignmentsPage';

import Login from './components/Login';
import AssignmentTeacherPage from './components/AssignmentTeacherPage';
import TeacherLogin from './components/TeacherLogin';
import AssignmentList from './components/AssignmentList';
import './styles/App.css';

function ProtectedRoute({ component, ...args }) {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
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
          <Route
            path="/teacher-login"
            element={<ProtectedRoute component={TeacherLogin} />}
          />
          <Route
            path="/teacher-assignments"
            element={<ProtectedRoute component={AssignmentTeacherPage} />}
          />
          <Route
            path="/assignment-detail/:assignmentId"
            element={<ProtectedRoute component={AssignmentList} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
