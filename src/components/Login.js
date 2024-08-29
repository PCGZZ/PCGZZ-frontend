import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/Login.css';
import deakinLogo from '../styles/image/deakin-university.png';

function Login() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const handleLogin = () => {
    loginWithRedirect({
      redirectUri: `${window.location.origin}/assignments`, // redirect to assignments page after login
    });
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
          <button className="login-button" onClick={handleLogin} type="button">
            Log in
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
