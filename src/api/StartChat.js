import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ChatBox.css';

function StartChat({ assignmentId, isVoiceMode }) {
  return (
    <div className="StartChat-input-container">
      {!isVoiceMode ? (
        <Link to={`/virtual-adult/${assignmentId}`}>
          <p className="inbox-text">Chat with your virtual patient now!</p>
        </Link>
      ) : (
        <Link to={`/voice-adult/${assignmentId}`}>
          <p className="inbox-text">Chat with your virtual patient now!</p>
        </Link>
      )}
    </div>
  );
}

export default StartChat;
