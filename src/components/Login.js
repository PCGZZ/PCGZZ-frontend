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

  const handleTeacherLogin = () => {
    navigate('/teacher-login'); // Navigate to the teacher login page
  };

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

  // call api to get user information
  const getUser = useCallback(async (tok) => {
    const res = await axios.get(`${BACKEND_API}/users/get`, {
      headers: {
        Authorization: `Bearer ${tok}`,
        'Content-Type': 'application/json',
      },
    });

    if (res.data.ok) {
      return res.data.user;
    }
  }, []);

  // after getting token, hand to backend api to perform functions
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

  // fetch token from auth0 and perform functions with token
  const fetchAndHandleToken = useCallback(async () => {
    const token = await fetchAccessToken({
      getAccessTokenSilently,
      getAccessTokenWithPopup,
      AUTH0_API_IDENTIFIER,
      AUTH0_SCOPE,
    });

    if (token) {
      await handleTokenOperations(token);
    } else {
      console.error('No token available after all attempts.');
      alert('Please turn off popup blocking settings and start again');
    }
  }, [getAccessTokenSilently, getAccessTokenWithPopup, handleTokenOperations]);

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
