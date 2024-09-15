import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react'; // import Auth0
import './index.css';
import App from './App';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const apiIdentifier = process.env.REACT_APP_AUTH0_API_IDENTIFIER;

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: apiIdentifier,
        scope:
          'openid profile email read:current_user update:current_user_metadata',
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);
