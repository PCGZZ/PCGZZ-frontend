import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ChatBox.css';

function StartChat({ assignmentId, isVoiceMode }) {
  if (!isVoiceMode) {
    return (
      <Link to={`/virtual-adult/${assignmentId}`}>
        <div className="StartChat-input-container">
          <p className="inbox-text">Chat with your virtual patient now!</p>
        </div>
      </Link>
    );
  }

  if (isVoiceMode) {
    return (
      <Link to={`/voice-adult/${assignmentId}`}>
        <div className="StartChat-input-container">
          <p className="inbox-text">Chat with your virtual patient now!</p>
        </div>
      </Link>
    );
  }
}

export default StartChat;
