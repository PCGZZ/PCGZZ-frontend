import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import fetchAccessToken from '../api/Authen'; // Mock the token fetching module

jest.mock('axios');
jest.mock('@auth0/auth0-react');
jest.mock('../api/Authen'); // Mock fetchAccessToken
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Login Component', () => {
  const mockAuth0 = {
    loginWithRedirect: jest.fn(),
    isAuthenticated: false,
    isLoading: false,
    getAccessTokenSilently: jest.fn(),
    getAccessTokenWithPopup: jest.fn(),
  };

  const mockNavigate = jest.fn();
  const mockToken = 'fake-token';

  beforeEach(() => {
    useAuth0.mockReturnValue(mockAuth0);
    useNavigate.mockReturnValue(mockNavigate);
    fetchAccessToken.mockResolvedValue(mockToken); // Ensure token is returned
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  test('renders the login page when not authenticated', () => {
    render(<Login />);

    // Check that the Deakin logo and login button are displayed
    expect(screen.getByAltText('Deakin University Logo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  test('calls loginWithRedirect when login button is clicked', () => {
    render(<Login />);

    const loginButton = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(loginButton);

    // Ensure loginWithRedirect is called when the button is clicked
    expect(mockAuth0.loginWithRedirect).toHaveBeenCalled();
  });

  test('shows loading message when isLoading is true', () => {
    mockAuth0.isLoading = true;
    render(<Login />);

    // Ensure the loading message is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('fetches token and navigates to assignments when authenticated', async () => {
    mockAuth0.isAuthenticated = true;

    axios.post.mockResolvedValue({}); // Mock loginDB API call
    render(<Login />);

    // Wait for the token fetching and navigation to happen
    await waitFor(() => {
      expect(fetchAccessToken).toHaveBeenCalled(); // Ensure token is fetched
      expect(mockNavigate).toHaveBeenCalledWith('/assignments'); // Ensure it navigates to assignments
    });
  });

  test('handles errors during token fetching and DB login', async () => {
    mockAuth0.isAuthenticated = true;

    // Simulate token fetching success but loginDB API failure
    axios.post.mockRejectedValue(new Error('API Error'));
    render(<Login />);

    await waitFor(() => {
      // Ensure error is logged when loginDB fails
      expect(console.error).toHaveBeenCalledWith(
        'Error in login DB:',
        expect.any(Error),
      );
    });
  });

  test('shows alert and logs error when no token is available', async () => {
    mockAuth0.isAuthenticated = true;
    fetchAccessToken.mockResolvedValue(null); // Simulate no token

    // Mock window alert
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Login />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'No token available after all attempts.',
      );
      expect(window.alert).toHaveBeenCalledWith(
        'Please turn off popup blocking settings and start again',
      );
    });

    window.alert.mockRestore();
  });
});
