import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Sidebar';

// Mock useAuth0 from Auth0
jest.mock('@auth0/auth0-react');

// Mock icons from MUI
jest.mock('@mui/icons-material/Assignment');
jest.mock('@mui/icons-material/Face2');
jest.mock('@mui/icons-material/Logout');

describe('Sidebar Component', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    useAuth0.mockReturnValue({
      logout: mockLogout,
      isAuthenticated: true,
    });
  });

  test('renders the sidebar when authenticated', () => {
    render(
      <Router>
        <Sidebar />
      </Router>,
    );

    // Check if sidebar elements are rendered
    expect(screen.getByText('Assignment')).toBeInTheDocument();
    expect(screen.getByText('Students')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  test('calls logout when clicking on log out button', () => {
    render(
      <Router>
        <Sidebar />
      </Router>,
    );

    // Simulate logout button click
    fireEvent.click(screen.getByText('Log out'));

    // Ensure logout is called
    expect(mockLogout).toHaveBeenCalledWith({
      logoutParams: { returnTo: window.location.origin },
    });
  });
});
