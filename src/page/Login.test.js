import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import fetchAccessToken from '../api/Authen'; // Mock the token fetching module

jest.mock('axios');
jest.mock('@auth0/auth0-react');
jest.mock('./Auth0Authen'); // Mock fetchAccessToken
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
  const mockRole = 'student';

  beforeEach(() => {
    useAuth0.mockReturnValue(mockAuth0);
    useNavigate.mockReturnValue(mockNavigate);
    fetchAccessToken.mockResolvedValue(mockToken); // Ensure token is returned
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  test('fetches token and navigates to the correct role-based page', async () => {
    mockAuth0.isAuthenticated = true;

    axios.post.mockResolvedValue({}); // Mock loginDB API call
    axios.get.mockResolvedValue({
      data: { ok: true, user: { role: mockRole } },
    }); // Mock getUserRole API call

    render(<Login />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
      );
      expect(mockNavigate).toHaveBeenCalledWith('/assignments'); // Navigates based on role
    });
  });

  test('handles errors during token fetching and navigating', async () => {
    mockAuth0.isAuthenticated = true;

    axios.post.mockRejectedValue(new Error('API Error')); // Mock failure in loginDB
    axios.get.mockResolvedValue({
      data: { ok: true, user: { role: mockRole } },
    }); // Mock getUserRole

    render(<Login />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Error in handling token:',
        expect.any(Error),
      );
    });
  });
});
