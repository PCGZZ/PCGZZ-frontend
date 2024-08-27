import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/Login.css"; // Ensure you have a Login.css file for styling
import deakinLogo from "../styles/image/deakin-university.png"; // Adjust the path if necessary

function Login() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
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
    );
  }
  // if it's authenticated
  return (
    <div>
      {user?.picture && <img src={user.picture} alt={user?.name} />}
      <h2>{user?.name}</h2>
      <ul>
        {Object.keys(user).map((objKey) => (
          <li key={objKey}>
            {objKey}:{user[objKey]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Login;
