import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatBox from './ChatBox';

// Test to ensure the input field is rendered in the ChatBox component
test('renders the input field', () => {
  render(<ChatBox />);

  // Find the input element by its placeholder text
  const inputElement = screen.getByPlaceholderText(/Ask anything.../i);

  // Assert that the input element is in the document
  expect(inputElement).toBeInTheDocument();
});
