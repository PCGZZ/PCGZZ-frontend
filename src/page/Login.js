import axios from 'axios';
import React, { useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_API, AUTH0_API_IDENTIFIER, AUTH0_SCOPE } from '../config';
import '../styles/Login.css';
import fetchAccessToken from '../api/Authen';
import deakinLogo from '../styles/image/deakin-university.png';

function Login() {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
    logout,
  } = useAuth0();
  const navigate = useNavigate();

  // call api to login in DB
  const loginDB = useCallback(async (tok) => {
    try {
      await axios.post(
        `${BACKEND_API}/users/loglogin`,
        {}, // no request body needed
        {
          headers: {
            Authorization: `Bearer ${tok}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return true;
    } catch (error) {
      alert(
        "You don't have permission to use this website, ask admin for permission",
      );
      return false;
    }
  }, []);

  // fetchAndHandleToken: fetches the token from auth0 and handles it
  const fetchAndHandleToken = useCallback(async () => {
    try {
      const token = await fetchAccessToken({
        getAccessTokenSilently,
        getAccessTokenWithPopup,
        AUTH0_API_IDENTIFIER,
        AUTH0_SCOPE,
      });

      if (token) {
        const login = await loginDB(token);
        if (login) {
          navigate('/assignments');
        } else {
          logout({
            logoutParams: {
              returnTo: window.location.origin, // Redirect to the deployment path
            },
          });
        }
        return;
      }
      console.error('No token available after all attempts.');
      alert('Please turn off popup blocking settings and start again');
    } catch (error) {
      console.error('Error fetching and handling token:', error);
    }
  }, [
    getAccessTokenSilently,
    getAccessTokenWithPopup,
    loginDB,
    navigate,
    logout,
  ]);

  // useEffect: fetch token and navigate based on the role
  useEffect(() => {
    if (isAuthenticated) {
      fetchAndHandleToken();
    }
  }, [isAuthenticated, fetchAndHandleToken]);

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
