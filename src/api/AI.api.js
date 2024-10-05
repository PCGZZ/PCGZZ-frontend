import { BACKEND_API } from '../config';

const AISendMessage = (input, op) => {
  /**
   * This function sends a message to the AI model
   * @param {string} input - The message to send
   * @param {function} op - The callback function to execute after receiving
   * response will be formatted as json object
   */
  console.log(
    `${BACKEND_API}/ai/demo/ask`,
    JSON.stringify({
      agent: '66c5965099528d233698d739',
      question: input,
    }),
  );
  fetch(`${BACKEND_API}/ai/demo/ask`, {
    method: 'POST', // Specify the request method
    mode: 'cors', // Add the CORS mode
    headers: {
      'Content-Type': 'application/json', // Set the content type
    },
    body: JSON.stringify({
      agent: '66c5965099528d233698d739',
      question: input,
    }), // Add the data
  })
    .then((response) => response.json()) // Parse the JSON from the response
    .then(op)
    .catch((error) => {
      console.error('Error:', error); // Handle errors
    });
};

export default AISendMessage;
