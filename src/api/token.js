import { useAuth0 } from '@auth0/auth0-react';

const useAuthToken = async () => {
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  let token = '';
  try {
    token = await getAccessTokenSilently();
  } catch (error) {
    console.error('Error in getting token:', error);
    try {
      token = await getAccessTokenWithPopup();
    } catch (popupError) {
      console.error('Error in getting token via popup:', popupError);
      if (popupError.message.includes('popup')) {
        alert('Please turn off popup blocking settings and try again.');
      } else {
        alert(`Error: ${popupError.message}`);
      }
    }
  }
  return token;
};
