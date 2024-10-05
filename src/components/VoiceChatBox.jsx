import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import StopIcon from '@mui/icons-material/Stop';
import ClearIcon from '@mui/icons-material/Clear';
import '../styles/ChatBox.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import avatarKris from '../styles/image/avatar_account.jpg'; // Adjust the path
import avatarTeacher from '../styles/image/virtual-adult.jpg'; // Import the teacher's avatar
import AISendMessage from '../api/AI.api';

function VoiceChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chances, setChances] = useState(15); // Initialize with 15 chances

  // speak text to voice
  const speakText = (textToSpeak) => {
    // Check if the browser supports speech synthesis
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(textToSpeak); // Create an utterance object
      speech.lang = 'en-US'; // Set language
      speech.rate = 1; // Set speed (1 is normal, <1 slower, >1 faster)
      speech.pitch = 1; // Set pitch (default is 1)

      window.speechSynthesis.speak(speech); // Speak the text
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  };

  // voice text conpoments
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    return <p>Browser does not support SpeechRecognition API</p>;
  }
  const recognition = new SpeechRecognition();
  recognition.continuous = true; // Keep listening even after user stops speaking
  recognition.interimResults = true; // Get interim results before speech ends
  recognition.lang = 'en-US'; // Set the language

  const sendMessage = () => {
    if (!input || chances <= 0) return; // Prevent sending if input is empty or no chances left
    // Reduce the chances by 1
    setChances(chances - 1);
    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);
    AISendMessage(input, (data) => {
      console.log(data);
      const botMessage = { text: data.response, sender: 'bot' };
      setMessages([...messages, newMessage, botMessage]);
    });

    setInput('');
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    // Loop through the results and separate interim and final transcripts
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const transcriptPart = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcriptPart; // Finalized text
      } else {
        interimTranscript += transcriptPart; // Interim (ongoing) text
      }
    }
    setInput(finalTranscript + interimTranscript);
    setTranscript(finalTranscript + interimTranscript); // Update the transcript state
  };

  recognition.onerror = (event) => {
    setError(`Error occurred in recognition: ${event.error}`);
  };

  const handleListening = () => {
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.start();
      setListening(true);
    }
  };

  const handleClear = () => {
    setTranscript('');
  };

  // recording icon
  const recordingIcon = listening ? (
    <StopIcon sx={{ color: 'var(--darker)' }} onClick={handleListening} />
  ) : (
    <KeyboardVoiceIcon
      sx={{ color: 'var(--darker)' }}
      onClick={handleListening}
    />
  );

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <span>
          VOICE:You have <strong>{chances}</strong>{' '}
          {chances === 1 ? 'chance ' : 'chances '}
          to talk to
          <strong> Dr Zhou</strong>
        </span>
      </div>
      <div className="chatbox-header">
        <span>{listening}</span>
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
            <PlayArrowIcon
              onClick={() => {
                speakText(msg.text);
              }}
            />
          </div>
        ))}
      </div>
      <div className="chatbox-input-container">
        {recordingIcon}
        <input type="text" placeholder="Ask anything..." value={transcript} />
        <IconButton
          sx={{ color: 'var(--darker)' }}
          size="small"
          onClick={sendMessage}
        >
          <SendIcon />
        </IconButton>
        <IconButton
          sx={{ color: 'var(--darker)' }}
          size="small"
          onClick={handleClear}
        >
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default VoiceChatBox;
