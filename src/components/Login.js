import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import deakinLogo from '../styles/image/deakin-university.png';

function Login() {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_AUTH0_CLIENT_SECRET;
  const apiProvider = process.env.REACT_APP_API_IDENTIFIER;
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const [authoriseCode, setCode] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    loginWithRedirect({
      responseType: 'code',
      client_id: clientId,
      audience: apiProvider,
    });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    console.log('authorization code:', code);
    setCode(code);
  }, [authoriseCode]);

  if (isAuthenticated) {
    console.log('authorization code1:', authoriseCode);
    const options = {
      method: 'POST',
      url: 'https://dev-dvuh4o3rmgqq1suz.us.auth0.com/oauth/token',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code: authoriseCode,
        redirect_uri: window.location.origin,
      }),
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

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
