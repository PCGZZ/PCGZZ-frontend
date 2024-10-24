/* eslint-disable no-console */
import { BACKEND_API } from '../config';

const AISendMessage = (body, op, token) => {
  /**
   * This function sends a message to the AI model
   * @param {string} input - The message to send
   * @param {function} op - The callback function to execute after receiving
   * response will be formatted as json object
   */
  fetch(`${BACKEND_API}/ai/ask`, {
    method: 'POST', // Specify the request method
    mode: 'cors', // Add the CORS mode
    headers: {
      'Content-Type': 'application/json', // Set the content type
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body), // Add the data
  })
    .then((response) => response.json()) // Parse the JSON from the response
    .then(op)
    .catch((error) => {
      console.error('Error:', error); // Handle errors
    });
};

export { AISendMessage };
