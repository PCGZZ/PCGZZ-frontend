import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/TeacherLogin.css'; // Ensure you create this CSS file
import deakinLogo from '../styles/image/deakin-university.png';

function TeacherLogin() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      redirectUri: `${window.location.origin}/teacher-assignments`, // redirect to teacher's assignments page after login
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="teacher-login-container">
        <div className="teacher-login-left">
          <img
            src={deakinLogo}
            alt="Deakin University Logo"
            className="deakin-logo"
          />
          <h1>Teacher Portal</h1>
          <button
            className="teacher-login-button"
            onClick={handleLogin}
            type="button"
          >
            Teacher Log in
          </button>
        </div>

        <div className="teacher-login-right">
          <div className="teacher-login-message">
            Access your teacher dashboard now!
          </div>
          <div className="teacher-image" />
        </div>
      </div>
    );
  }

  return null;
}

export default TeacherLogin;
