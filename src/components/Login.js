import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Ensure you have a Login.css file for styling

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Redirect to the main page (assignments or virtual adult) after login
    navigate('/assignments');
  };

  return (
    <div className="login-container">
      <div className="login-left">
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
        {/* Updated to be self-closing */}
      </div>
    </div>
  );
}

export default Login;
