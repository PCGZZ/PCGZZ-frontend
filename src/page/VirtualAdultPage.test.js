import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For custom matchers
import VirtualAdultPage from './VirtualAdultPage';

// Mocking the components with simple implementations
jest.mock('../components/Sidebar', () => {
  return function SidebarMock() {
    return <div data-testid="sidebar">Mocked Sidebar</div>;
  };
});

jest.mock('../components/ChatBox', () => {
  return function ChatBoxMock() {
    return <div data-testid="chatbox">Mocked ChatBox</div>;
  };
});

describe('VirtualAdultPage Component', () => {
  test('should render Sidebar and ChatBox components', () => {
    // Render the VirtualAdultPage
    render(<VirtualAdultPage />);

    // Assert that the mocked components are rendered
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('chatbox')).toBeInTheDocument();
  });
});
