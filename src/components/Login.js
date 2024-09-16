import axios from 'axios';
import React, { useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import deakinLogo from '../styles/image/deakin-university.png';

function Login() {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
  } = useAuth0();
  const navigate = useNavigate();
  const testApi = 'https://testing-43453241909.australia-southeast2.run.app';
  const apiIdentifier = process.env.REACT_APP_API_IDENTIFIER;
  const defaultScope =
    'openid profile email read:current_user update:current_user_metadata';

  const loginDB = useCallback(async (tok) => {
    await axios.post(
      `${testApi}/users/loglogin`,
      {}, // no request body needed
      {
        headers: {
          Authorization: `Bearer ${tok}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }, []);

  const getUser = useCallback(async (tok) => {
    const res = await axios.get(`${testApi}/users/get`, {
      headers: {
        Authorization: `Bearer ${tok}`,
        'Content-Type': 'application/json',
      },
    });

    if (res.data.ok === true) {
      return res.data.user;
    }
  }, []);

  const handleTokenOperations = useCallback(
    async (tok) => {
      try {
        await loginDB(tok);
        const user = await getUser(tok);
        console.log('User:', user);
      } catch (error) {
        console.error('Error in handling token:', error);
        console.log('handle token:', tok);
      }
    },
    [getUser, loginDB],
  );

  const getAccessTokenPopup = useCallback(async () => {
    try {
      const tok = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: apiIdentifier,
          scope: defaultScope,
        },
      });
      console.log('Access Token popup:', tok);
      await handleTokenOperations(tok);
      return tok; // Return the token
    } catch (error) {
      // Check if popup blocking leads to the error
      if (error.message.includes('popup')) {
        alert('Please turn off popup blocking settings and start again');
      } else {
        alert('Failed to get token via popup: ', error.message);
      }
      return null; // Return null if there is an error
    }
  }, [apiIdentifier, getAccessTokenWithPopup, handleTokenOperations]);

  const fetchAndHandleToken = useCallback(async () => {
    let token = null;
    try {
      // Get access token silently
      token = await getAccessTokenSilently({
        authorizationParams: {
          audience: apiIdentifier,
          scope: defaultScope,
        },
      });
      console.log('Access Token silently:', token);
    } catch (error) {
      console.error('Failed to get token silently:', error);
      // If silently get access token unsuccessful, try using popup
      token = await getAccessTokenPopup();
    }

    if (token) {
      await handleTokenOperations(token);
    } else {
      console.error('No token available after all attempts.');
      alert('Please turn off popup blocking settings and start again');
    }
  }, [
    apiIdentifier,
    getAccessTokenSilently,
    getAccessTokenPopup,
    handleTokenOperations,
  ]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAndHandleToken();
      navigate('/assignments');
    }
  }, [navigate, isAuthenticated, fetchAndHandleToken]);

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
            onClick={loginWithRedirect}
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
        </div>
      </div>
    );
  }

  return null;
}

export default Login;
