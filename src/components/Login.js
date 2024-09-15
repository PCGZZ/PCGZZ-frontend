import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import deakinLogo from '../styles/image/deakin-university.png';

function Login() {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    getIdTokenClaims,
    getAccessTokenSilently,
  } = useAuth0();
  const navigate = useNavigate();
  const backendApi = 'http://localhost:3001';
  const apiIdentifier = process.env.REACT_APP_API_IDENTIFIER;

  const loginDB = (token) => {
    console.log('Posting to URL:', `${backendApi}/loglogin`);
    axios.post(
      `${backendApi}/loglogin`,
      {}, // no request body needed
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
  };

  const getUser = async (token) => {
    const res = await axios.get(`${backendApi}/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.ok === true) {
      return res.data.user;
    }
  };

  const handleTokenOperations = async (token) => {
    try {
      await loginDB(token);
      const user = await getUser(token);
      console.log('User:', user);
    } catch (error) {
      console.error('处理 token 时发生错误:', error);
    }
  };

  // get access token version
  // const fetchTokenAndPerformActions = async () => {
  //   try {
  //     // 获取 Access Token
  //     const token = await getAccessTokenSilently({
  //       authorizationParams: {
  //         audience: apiIdentifier, // 确保与 Auth0Provider 中的 audience 一致
  //         scope:
  //           'openid profile email read:current_user update:current_user_metadata', // 确保 scope 一致
  //       },
  //     });

  //     console.log('Access Token:', token);

  //     // 如果需要获取 ID Token
  //     // const idTokenClaims = await getIdTokenClaims();
  //     // const idToken = idTokenClaims.__raw;
  //     // console.log('ID Token:', idToken);

  //     // 处理 token
  //     await handleTokenOperations(token);
  //   } catch (error) {
  //     console.error('获取 token 失败:', error);
  //   }
  // };

  // get id token version
  const fetchTokenAndPerformActions = async () => {
    try {
      const token = await getIdTokenClaims();
      const rawToken = token.__raw;
      console.log(rawToken);

      // login in db & get user information
      await handleTokenOperations(rawToken);
    } catch (error) {
      console.error('获取 ID Token 失败:', error);
    }
  };

  if (isAuthenticated) {
    console.log(1);
    fetchTokenAndPerformActions();
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
          <button
            className="login-button"
            onClick={loginWithRedirect()}
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
