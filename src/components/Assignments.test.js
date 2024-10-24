import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Assignments from './Assignments';

// Mock axios and useAuth0
jest.mock('axios');
jest.mock('@auth0/auth0-react');

// Mocked data for assignments
const mockAssignments = [
  {
    _id: '1',
    title: 'Assignment 1',
    numOfQuestions: 10,
    releaseDate: '2024-01-01T00:00:00Z',
    dueDate: '2024-01-31T00:00:00Z',
  },
  {
    _id: '2',
    title: 'Assignment 2',
    numOfQuestions: 5,
    releaseDate: '2024-02-01T00:00:00Z',
    dueDate: '2024-02-28T00:00:00Z',
  },
];

// Mock Auth0 hooks
const mockAuth0 = {
  getAccessTokenSilently: jest.fn(),
  getAccessTokenWithPopup: jest.fn(),
};

// Helper to mock axios and Auth0 token fetching
beforeEach(() => {
  useAuth0.mockReturnValue(mockAuth0);
  mockAuth0.getAccessTokenSilently.mockResolvedValue('fake-token');
  axios.get.mockResolvedValue({
    data: { ok: true, assignments: mockAssignments },
  });
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

describe('Assignments Component', () => {
  test('renders the component correctly', async () => {
    render(
      <Router>
        <Assignments />
      </Router>,
    );

    // Check if the heading is displayed
    expect(screen.getByText('Assignments')).toBeInTheDocument();

    // Wait for the axios request to be made
    await waitFor(() => {
      // Check if the axios.get was called with the correct URL and headers
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/assignment/list'),
        {
          headers: {
            Authorization: 'Bearer fake-token',
            'Content-Type': 'application/json',
          },
        },
      );
    });

    // Wait for the assignments to be rendered
    await waitFor(() =>
      expect(screen.getByText('Assignment 1')).toBeInTheDocument(),
    );

    // Check if assignment data is rendered
    expect(screen.getByText('Assignment 1')).toBeInTheDocument();
    expect(screen.getByText('Assignment 2')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('renders "No assignments" when there are no assignments', async () => {
    axios.get.mockResolvedValue({ data: { ok: true, assignments: [] } });

    render(
      <Router>
        <Assignments />
      </Router>,
    );

    // Wait for the assignments API call
    await waitFor(() =>
      expect(screen.getByText('No assignments.')).toBeInTheDocument(),
    );

    // Check that the "No assignments" message is shown
    expect(screen.getByText('No assignments.')).toBeInTheDocument();
  });

  test('handles API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));

    render(
      <Router>
        <Assignments />
      </Router>,
    );

    // Ensure the error doesn't break rendering
    await waitFor(() =>
      expect(screen.getByText('No assignments.')).toBeInTheDocument(),
    );

    // Ensure no console errors (optional)
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching assignments:',
      expect.any(Error),
    );
  });
});
