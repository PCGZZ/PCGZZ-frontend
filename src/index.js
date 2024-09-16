import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import {
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_API_IDENTIFIER,
  AUTH0_SCOPE,
} from './config';
import './index.css';
import App from './App';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: AUTH0_API_IDENTIFIER,
        scope: AUTH0_SCOPE,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);
