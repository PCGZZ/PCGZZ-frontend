import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom'; // Import navigate for internal routing
import '../styles/Login.css';
import deakinLogo from '../styles/image/deakin-university.png';

function Login() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate(); // Hook for navigation

  const handleStudentLogin = () => {
    loginWithRedirect({
      redirectUri: `${window.location.origin}/assignments`, // redirect to assignments page after login
    });
  };

  const handleTeacherLogin = () => {
    navigate('/teacher-login'); // Navigate to the teacher login page
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-left">
          <img
            src={deakinLogo}
            alt="Deakin University Logo"
            className="deakin-logo"
          />
          <h1>Welcome</h1>
          <button
            className="login-button"
            onClick={handleStudentLogin}
            type="button"
          >
            Log in
          </button>
          {/* Add Teacher Login button below the student login */}
          <button
            className="teacher-login-button"
            onClick={handleTeacherLogin}
            type="button"
          >
            Teacher Log in
          </button>
        </div>
        <div className="login-right">
          <div className="login-message">
            Chat with your virtual adults now!!!
          </div>
          <div className="woman-with-tablet" />
        </div>
      </div>
    );
  }

  return null;
}

export default Login;
