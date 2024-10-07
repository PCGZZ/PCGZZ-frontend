/* eslint-disable */
import React, { useState, useCallback,useEffect } from 'react';
// import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import StopIcon from '@mui/icons-material/Stop';
// import ClearIcon from '@mui/icons-material/Clear';
import '../styles/VoiceChatBox.css';
import { useAuth0 } from '@auth0/auth0-react';
// import CancelIcon from '@mui/icons-material/Cancel';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { AISendMessage } from '../api/AI.api';

import VoiceChatMessage from './VoiceMessage';
import { v4 } from 'uuid';
// import { BACKEND_API, AUTH0_API_IDENTIFIER, AUTH0_SCOPE } from '../config';
// import InputBar from './voiceModule/InputBar';

const waveSvg = (
  <svg
    width="87"
    height="32"
    viewBox="0 0 87 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flex: 1 }}
  >
    <rect
      opacity="0.66"
      x="0.5"
      y="15"
      width="2"
      height="2"
      rx="1"
      fill="#339CAB"
    />
    <rect
      opacity="0.66"
      x="6.5"
      y="12"
      width="2"
      height="8"
      rx="1"
      fill="#339CAB"
    />
    <rect
      opacity="0.66"
      x="12.5"
      y="9"
      width="2"
      height="14"
      rx="1"
      fill="#339CAB"
    />
    <rect
      opacity="0.66"
      x="18.5"
      y="14"
      width="2"
      height="4"
      rx="1"
      fill="#339CAB"
    />
    <rect
      opacity="0.66"
      x="24.5"
      y="8"
      width="2"
      height="16"
      rx="1"
      fill="#339CAB"
    />
    <rect
      opacity="0.66"
      x="30.5"
      y="9"
      width="2"
      height="14"
      rx="1"
      fill="#339CAB"
    />
    <rect
      opacity="0.66"
      x="36.5"
      y="11"
      width="2"
      height="10"
      rx="1"
      fill="#339CAB"
    />
    <rect
      opacity="0.66"
      x="42.5"
      y="11"
      width="2"
      height="10"
      rx="1"
      fill="#339CAB"
    />
    <rect
      opacity="0.66"
      x="48.5"
      y="11"
      width="2"
      height="10"
      rx="1"
      fill="#339CAB"
    />
    <rect
      opacity="0.66"
      x="54.5"
      y="9"
      width="2"
      height="14"
      rx="1"
      fill="#339CAB"
    />
    <rect
      opacity="0.66"
      x="60.5"
      y="11"
      width="2"
      height="10"
      rx="1"
      fill="#339CAB"
    />
    <rect
      opacity="0.66"
      x="66.5"
      y="8"
      width="2"
      height="16"
      rx="1"
      fill="#339CAB"
    />
    <rect
      opacity="0.66"
      x="72.5"
      y="11"
      width="2"
      height="10"
      rx="1"
      fill="#339CAB"
    />
    <rect
      opacity="0.66"
      x="78.5"
      y="14"
      width="2"
      height="4"
      rx="1"
      fill="#339CAB"
    />
    <rect
      opacity="0.66"
      x="84.5"
      y="15"
      width="2"
      height="2"
      rx="1"
      fill="#339CAB"
    />
  </svg>
);

const newMessage1 = {
  id: '1',
  text: 'Hello! How can I help you today?',
  sender: 'bot',
};
const newMessage2 = {
  id: '2',
  text: 'Hello! How can I help you today?',
  sender: 'user',
};
const newMessage3 = {
  id: '3',
  text: 'Hello! How can I help you today?',
  sender: 'bot',
};

function VoiceChatBox() {
  const [messages, setMessages] = useState([
    newMessage1,
    newMessage2,
    newMessage3,
  ]);
  const [input, setInput] = useState('');
  const [chances, setChances] = useState(15); // Initialize with 15 chances
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  // voice text conpoments
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceError, setVoiceError] = useState('');
  const [textShow, setTextShow] = useState([false,true,false]);


  // api call to send message
  const getToken = useCallback(async () => {
    let token = '';
    try {
      token = await getAccessTokenSilently();
    } catch (error) {
      console.error('Error in getting token:', error);
      try {
        token = await getAccessTokenWithPopup();
      } catch (popupError) {
        console.error('Error in getting token via popup:', popupError);
        if (popupError.message.includes('popup')) {
          alert('Please turn off popup blocking settings and try again.');
        } else {
          alert(`Error: ${popupError.message}`);
        }
      }
    }
    return token;
  }, [getAccessTokenSilently, getAccessTokenWithPopup]);

  const sendMessage = async () => {
    const token = await getToken();
    console.log(input);
    if (!input || chances <= 0) return; // Prevent sending if input is empty or no chances left
    console.log('Token:', token);
    // Reduce the chances by 1
    setChances(chances - 1);
    const newMessage = { text: input, sender: 'user',id:v4()};
    setMessages([...messages, newMessage]);
    AISendMessage(
      {
        agent: '66c5965099528d233698d739',
        question: input,
        submission: '66ed1a2aa739d9ae9c61d21f', // demo submission id
      },
      (data) => {
        console.log(data);
        const botMessage = { text: data.response, sender: 'bot', id:v4() };
        setTextShow([...textShow,false,false]);
        setMessages([...messages, newMessage, botMessage]);
      },
      token,
    );

    setInput('');
  };

  // speak text to voice
  const speakText = (textToSpeak) => {
    // Check if the browser supports speech synthesis
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(textToSpeak); // Create an utterance object
      speech.lang = 'en-US'; // Set language
      speech.rate = 1; // Set speed (1 is normal, <1 slower, >1 faster)
      speech.pitch = 1; // Set pitch (default is 1)
      const [, , , voice] = window.speechSynthesis.getVoices();
      speech.voice = voice;
      window.speechSynthesis.speak(speech); // Speak the text
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  };

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    return <p>Browser does not support SpeechRecognition API</p>;
  }
  const recognition = new SpeechRecognition();
  recognition.continuous = true; // Keep listening even after user stops speaking
  recognition.interimResults = true; // Get interim results before speech ends
  recognition.lang = 'en-US'; // Set the language

  recognition.onresult = (event) => {
    // if (listening === false) return; // Don't do anything if listening is off
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
    setVoiceError(`Error occurred in recognition: ${event.error}`);
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

  const inputBar = listening ? (
    <div className="vcb-input-container">
      <IconButton className="input-button">
        <div className="input-button-stack">
          <CircleRoundedIcon
            // className="input-button-stack"
            style={{ color: '#89DFDF75', fontSize: '30' }}
          />
        </div>
        <div className="input-button-stack">
          <CloseRoundedIcon
            // className="input-button-stack"
            onClick={handleListening}
            style={{ color: '#339CAB', fontSize: '30' }}
          />
        </div>
      </IconButton>

      {/* WaveForm svg Pls   */}
      {waveSvg}

        <IconButton className="input-button" onClick={sendMessage}>
          <CheckCircleIcon style={{ color: '339CAB', fontSize: '30' }} />
        </IconButton>
  
      <p>{transcript}</p>
    </div>
  ) : (
    <div className="vcb-input-container">
      <IconButton onClick={handleListening} style={{ alignSelf: 'center' }}>
        <KeyboardVoiceIcon style={{ color: '#339CAB' }} />
      </IconButton>
    </div>
  );

  return (
    <div className="vcb-container">
      <div className="vcb-header">
        <span>
          VOICE:You have <strong>{chances}</strong>{' '}
          {chances === 1 ? 'chance ' : 'chances '}
          to talk to
          <strong> Dr Zhou</strong>
        </span>
      </div>
      <div className="vcb-messages">
        {messages.map((msg,i) =>
          VoiceChatMessage(msg, () => speakText(msg.text),textShow,setTextShow,i),
        )}
      </div>

      {inputBar}
    </div>
  );
}

export default VoiceChatBox;
