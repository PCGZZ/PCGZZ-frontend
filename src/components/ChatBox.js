import React, { useState } from 'react';
import '../styles/ChatBox.css'; // Ensure the path is correct

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chances, setChances] = useState(15); // Initialize with 15 chances

  const sendMessage = () => {
    if (!input || chances <= 0) return; // Prevent sending if input is empty or no chances left

    // Reduce the chances by 1
    setChances(chances - 1);

    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);

    const botMessage = { text: 'This is a response from the bot.', sender: 'bot' };
    setMessages([...messages, newMessage, botMessage]);

    setInput('');
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <span>
          You have
          <strong>{chances}</strong>
          {' '}
          {chances === 1 ? 'chance' : 'chances'}
          to talk to
          <strong> Dr Zhou</strong>
        </span>
      </div>
      <div className="chatbox-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chatbox-message ${msg.sender}`}>
            <img
              className="avatar"
              src={msg.sender === 'user' ? '/path/to/user-avatar.png' : '/path/to/bot-avatar.png'}
              alt={`${msg.sender} avatar`}
            />
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chatbox-input-container">
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
        <button type="button" onClick={sendMessage}>
          <img src="/path/to/send-icon.png" alt="Send" />
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
