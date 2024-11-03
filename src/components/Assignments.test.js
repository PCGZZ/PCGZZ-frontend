// Assignments.test.js
import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { MemoryRouter } from 'react-router-dom';
import Assignments from './Assignments';

jest.mock('axios');
jest.mock('@auth0/auth0-react');
jest.mock('../api/Authen');
jest.mock('../api/user.api');

describe('Assignments Component', () => {
  const mockAuth0 = {
    getAccessTokenSilently: jest.fn(),
    getAccessTokenWithPopup: jest.fn(),
  };

  beforeEach(() => {
    useAuth0.mockReturnValue(mockAuth0);
    console.error = jest.fn(); // Mock console.error to catch error logs
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading initially', () => {
    render(
      <MemoryRouter>
        <Assignments />
      </MemoryRouter>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays "No assignments" when there are no assignments', async () => {
    axios.get.mockResolvedValueOnce({ data: { ok: true, assignments: [] } });

    await act(async () => {
      render(
        <MemoryRouter>
          <Assignments />
        </MemoryRouter>,
      );
    });

    expect(await screen.findByText('No assignments.')).toBeInTheDocument();
  });
});
