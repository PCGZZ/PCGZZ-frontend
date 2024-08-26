import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/Login.css"; // Ensure you have a Login.css file for styling

function Login() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <div className="login-container">
        <div className="login-left">
          <h1>Welcome</h1>
          <button
            className="login-button"
            onClick={() => loginWithRedirect()}
            type="button"
          >
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
    )
  );
}

export default Login;
