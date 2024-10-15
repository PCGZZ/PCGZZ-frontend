import React, { useState, useCallback, useEffect, useRef } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import '../styles/ChatBox.css';
import { useAuth0 } from '@auth0/auth0-react';
import fetchAccessToken from './Auth0Authen';
import { AUTH0_API_IDENTIFIER, AUTH0_SCOPE } from '../config';
import avatarKris from '../styles/image/avatar_account.jpg'; // Adjust the path
import avatarTeacher from '../styles/image/virtual-adult.jpg'; // Import the teacher's avatar
import { AISendMessage } from '../api/AI.api';
import { createSubmission } from '../api/submission.api';

function ChatBox({ assignmentId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chances, setChances] = useState(15); // Initialize with 15 chances
  const [submission, setSubmission] = useState();
  const [submissionId, setSubmissionId] = useState();
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  // Reference for the chat message container
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the message container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch the token and submission details including chat history
  const fetchTokenAndSubmission = useCallback(async () => {
    try {
      const token = await fetchAccessToken({
        getAccessTokenSilently,
        getAccessTokenWithPopup,
        AUTH0_API_IDENTIFIER,
        AUTH0_SCOPE,
      });

      if (token) {
        const loadedSubmission = await createSubmission(token, assignmentId);
        if (loadedSubmission) {
          setSubmission(loadedSubmission);
          setChances(loadedSubmission.numOfQuestions);
          setSubmissionId(loadedSubmission._id);

          // Load chat history from submissionModel
          if (
            loadedSubmission.chatHistory &&
            loadedSubmission.chatHistory.length > 0
          ) {
            const loadedMessages = loadedSubmission.chatHistory.map(
              (chat, index) => ({
                text: chat.content,
                sender: chat.role === 'user' ? 'user' : 'bot',
                id: index, // Generate a key using the index
              }),
            );
            setMessages(loadedMessages);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching token or submission:', error);
    } finally {
      setIsLoading(false); // End loading state when data is fetched
    }
  }, [getAccessTokenSilently, getAccessTokenWithPopup, assignmentId]);

  // Load the chat history when the page loads
  useEffect(() => {
    fetchTokenAndSubmission();
  }, [fetchTokenAndSubmission]);

  // Scroll to the bottom whenever the messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input || chances <= 0) return; // Prevent sending if input is empty or no chances left
    setChances(chances - 1);

    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);

    try {
      const token = await fetchAccessToken({
        getAccessTokenSilently,
        getAccessTokenWithPopup,
        AUTH0_API_IDENTIFIER,
        AUTH0_SCOPE,
      });

      if (token) {
        AISendMessage(
          {
            submission: submissionId, // Use the fetched submission ID
            question: input,
          },
          (data) => {
            const botMessage = { text: data.response, sender: 'bot' };
            setMessages([...messages, newMessage, botMessage]);
          },
          token,
        );
      }
    } catch (error) {
      console.error('Error fetching token or submission:', error);
    }

    setInput('');
  };

  if (isLoading) {
    return <div>Loading...</div>; // Display loading state
  }

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
        {/* Dummy div to scroll to */}
        <div ref={messagesEndRef} />
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
