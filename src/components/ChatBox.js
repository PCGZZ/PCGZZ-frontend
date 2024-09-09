import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import '../styles/ChatBox.css';
import avatarKris from '../styles/image/avatar_account.jpg'; // Adjust the path
import avatarTeacher from '../styles/image/virtual-adult.jpg'; // Import the teacher's avatar

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chances, setChances] = useState(15); // Initialize with 15 chances

  const sendMessage = () => {
    if (!input || chances <= 0) return; // Prevent sending if input is empty or no chances left
    const endpoint = process.env.REACT_APP_BACKEND_API || 'err'; // Update the endpoint
    // Reduce the chances by 1
    setChances(chances - 1);

    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);

    // eslint-disable-next-line
    console.log(
      `${endpoint}/ai/demo/ask`,
      JSON.stringify({
        agent: '66c5965099528d233698d739',
        question: input,
      }),
    );

    fetch(`${endpoint}/ai/demo/ask`, {
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
      .then((data) => {
        // eslint-disable-next-line
        console.log(data);
        const botMessage = { text: data.response, sender: 'bot' };
        setMessages([...messages, newMessage, botMessage]);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Error:', error); // Handle errors
      });

    setInput('');
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <span>
          You have <strong>{chances}</strong>{' '}
          {chances === 1 ? 'chance ' : 'chances '}
          to talk to
          <strong> Dr Zhou</strong>
        </span>
      </div>
      <div className="chatbox-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chatbox-message ${msg.sender}`}>
            <img
              className="avatar"
              src={msg.sender === 'user' ? avatarKris : avatarTeacher}
              alt={`${msg.sender} avatar`}
            />
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chatbox-input-container">
        <KeyboardVoiceIcon sx={{ color: 'var(--darker)' }} />
        <input
          type="text"
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <IconButton
          sx={{ color: 'var(--darker)' }}
          size="small"
          onClick={sendMessage}
        >
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatBox;
