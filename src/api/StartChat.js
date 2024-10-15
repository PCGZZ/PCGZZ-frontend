import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ChatBox.css';

function StartChat({ assignmentId }) {
  return (
    <div className="StartChat-input-container">
      <Link to={`/virtual-adult/${assignmentId}`}>
        <p className="inbox-text">Chat with your virtual patient now!</p>
      </Link>
    </div>
  );
}

export default StartChat;
