const fetchAccessToken = async ({
  getAccessTokenSilently,
  getAccessTokenWithPopup,
  AUTH0_API_IDENTIFIER,
  AUTH0_SCOPE,
}) => {
  let token = null;

  try {
    // get access token silently, this method should work at deployment env
    token = await getAccessTokenSilently({
      authorizationParams: {
        audience: AUTH0_API_IDENTIFIER,
        scope: AUTH0_SCOPE,
      },
    });
    console.log('Access Token silently:', token);
  } catch (error) {
    console.error('Failed to get token silently:', error);

    // if failed, try getAccessTokenWithPopup. This method should work at localhost env
    try {
      token = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: AUTH0_API_IDENTIFIER,
          scope: AUTH0_SCOPE,
        },
      });
      console.log('Access Token via popup:', token);
    } catch (popupError) {
      console.error('Failed to get token via popup:', popupError);
      if (popupError.message.includes('popup')) {
        alert('Please turn off popup blocking settings and try again.');
      } else {
        alert(`Error: ${popupError.message}`);
      }
    }
  }

  return token;
};

export default fetchAccessToken;
