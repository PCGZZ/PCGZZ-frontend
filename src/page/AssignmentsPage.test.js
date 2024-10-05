import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For custom matchers
import AssignmentsPage from './AssignmentsPage';

// Mocking the components
jest.mock('../components/SearchBar', () => {
  return function SearchBarMock() {
    return <div data-testid="searchbar">SearchBar</div>;
  };
});

jest.mock('../components/Sidebar', () => {
  return function SidebarMock() {
    return <div data-testid="sidebar">Sidebar</div>;
  };
});

jest.mock('../components/Assignments', () => {
  return function AssignmentsMock() {
    return <div data-testid="assignments">Assignments</div>;
  };
});

describe('AssignmentsPage Component', () => {
  test('should render SearchBar, Sidebar, and Assignments components', () => {
    // Render the AssignmentsPage
    render(<AssignmentsPage />);

    // Assert that the mocked components are rendered
    expect(screen.getByTestId('searchbar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('assignments')).toBeInTheDocument();
  });
});
