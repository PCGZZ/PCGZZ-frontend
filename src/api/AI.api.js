/* eslint-disable no-console */
import axios from 'axios';
import { Buffer } from 'buffer';
import defaultVa from '../styles/image/virtual-adult.jpg';
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

const AIGetVaPhoto = async (tok, assignmentId, setVaPhoto, setVaName) => {
  setVaName('Virtual Adult');
  setVaPhoto(defaultVa);
  const res1 = await axios.get(`${BACKEND_API}/assignment?id=${assignmentId}`, {
    headers: {
      Authorization: `Bearer ${tok}`,
      'Content-Type': 'application/json',
    },
  });
  if (res1.data.ok) {
    const vaId = res1.data.assignment.virtualAdult;
    try {
      const res = await axios.get(`${BACKEND_API}/va?id=${vaId}`, {
        headers: {
          Authorization: `Bearer ${tok}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.data.ok) {
        if (res.data.va.photo && res.data.va.photo.data.type === 'Buffer') {
          const buffer = Buffer.from(res.data.va.photo.data.data).toString(
            'base64',
          );
          const base64Photo = `data:image/jpeg;base64,${buffer}`;
          console.log('Successfully get va photo and name');
          setVaPhoto(base64Photo);
          setVaName(res.data.va.name);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};
export { AISendMessage, AIGetVaPhoto };
