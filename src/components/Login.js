import axios from 'axios';
import React, { useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_API, AUTH0_API_IDENTIFIER, AUTH0_SCOPE } from '../config';
import '../styles/Login.css';
import fetchAccessToken from './Auth0Authen';
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

  // call api to login in DB
  const loginDB = useCallback(async (tok) => {
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
  }, []);

  // getUserRole function: gets the user role from the backend
  const getUserRole = useCallback(async (tok) => {
    const res = await axios.get(`${BACKEND_API}/users/get`, {
      headers: {
        Authorization: `Bearer ${tok}`,
        'Content-Type': 'application/json',
      },
    });

    if (res.data.ok) {
      return res.data.user.role;
    }
    throw new Error('Failed to fetch user role');
  }, []);

  // handleTokenOperations: logs the user and gets the role
  const handleTokenOperations = useCallback(
    async (tok) => {
      try {
        await loginDB(tok);
        const role = await getUserRole(tok);
        console.log('Role:', role);
        return role;
      } catch (error) {
        console.error('Error in handling token:', error);
      }
    },
    [getUserRole, loginDB],
  );

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
        const role = await handleTokenOperations(token);
        return role;
      }
      console.error('No token available after all attempts.');
      alert('Please turn off popup blocking settings and start again');
    } catch (error) {
      console.error('Error fetching and handling token:', error);
    }
  }, [getAccessTokenSilently, getAccessTokenWithPopup, handleTokenOperations]);

  // useEffect: fetch token and navigate based on the role
  useEffect(() => {
    if (isAuthenticated) {
      fetchAndHandleToken()
        .then((role) => {
          if (role === 'educator') {
            navigate('/teacher-assignments');
          } else if (role === 'student') {
            navigate('/assignments');
          } else {
            console.error('Unknown role:', role);
          }
        })
        .catch((error) => {
          console.error('Error navigating based on role:', error);
        });
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
