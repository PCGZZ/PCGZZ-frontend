import React, { useState, useCallback, useEffect, useRef } from 'react';
// import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import StopIcon from '@mui/icons-material/Stop';
// import ClearIcon from '@mui/icons-material/Clear';
import '../styles/VoiceChatBox.css';
import { useAuth0 } from '@auth0/auth0-react';
// import CancelIcon from '@mui/icons-material/Cancel';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { v4 } from 'uuid';
import { enqueueSnackbar } from 'notistack';
import avatarTeacher from '../styles/image/virtual-adult.jpg'; // Import the teacher's avatar
import { AISendMessage, AIGetVaPhoto } from '../api/AI.api';
import VoiceChatMessage from './VoiceMessage';
// import InputBar from './voiceModule/InputBar';
import { createSubmission } from '../api/submission.api';

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

function VoiceChatBox({ assignmentId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chances, setChances] = useState(15); // Initialize with 15 chances
  const { getAccessTokenSilently } = useAuth0();
  // voice text conpoments
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceError, setVoiceError] = useState('');
  const [vaPhoto, setVaPhoto] = useState(avatarTeacher);

  // const [submission, setSubmission] = useState();
  // const [submissionId, setSubmissionId] = useState();
  const [textShow, setTextShow] = useState([false, true, false]); // Showing transcript of voice message
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [submissionId, setSubmissionId] = useState();
  const sendMessage = useCallback(async () => {
    const token = await getAccessTokenSilently();
    // console.log(input);
    if (!input || chances <= 0) return; // Prevent sending if input is empty or no chances left
    // console.log('Token:', token);
    // Reduce the chances by 1
    setChances(chances - 1);
    const newMessage = { text: input, sender: 'user', id: v4() };
    setMessages([...messages, newMessage]);
    AISendMessage(
      {
        agent: '66c5965099528d233698d739',
        question: input,
        submission: submissionId, // submission id
      },
      (data) => {
        // console.log(data);
        const botMessage = { text: data.response, sender: 'bot', id: v4() };
        setTextShow([...textShow, false, false]);
        setMessages([...messages, newMessage, botMessage]);
      },
      token,
    );

    setInput('');
  }, [
    chances,
    getAccessTokenSilently,
    input,
    messages,
    textShow,
    submissionId,
  ]);

  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the message container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getVaPhoto = useCallback(
    async (tok) => {
      try {
        await AIGetVaPhoto(tok, assignmentId, setVaPhoto);
      } catch (error) {
        console.error(error);
      }
    },
    [assignmentId],
  );

  // Fetch the token and submission details including chat history
  const fetchTokenAndSubmission = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();

      if (token) {
        await getVaPhoto(token);
        const loadedSubmission = await createSubmission(token, assignmentId);
        if (loadedSubmission) {
          // setSubmission(loadedSubmission);
          setChances(loadedSubmission.numOfQuestions);
          setSubmissionId(loadedSubmission._id);

          // Load chat history from submissionModel
          if (
            loadedSubmission.chatHistory &&
            loadedSubmission.chatHistory.length > 0
          ) {
            const loadedMessages = loadedSubmission.chatHistory.map((chat) => ({
              text: chat.content,
              sender: chat.role === 'user' ? 'user' : 'bot',
              id: v4(),
            }));
            setMessages(loadedMessages);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching token or submission:', error);
    } finally {
      setIsLoading(false); // End loading state when data is fetched
    }
  }, [getAccessTokenSilently, getVaPhoto, assignmentId]);

  // Load the chat history when the page loads
  useEffect(() => {
    fetchTokenAndSubmission();
  }, [fetchTokenAndSubmission]);

  // Scroll to the bottom whenever the messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load the chat history when the page loads
  // useEffect(() => {
  //   const func = async () => {
  //     try {
  //       const token = await getAccessTokenSilently();
  //       if (token) {
  //         const loadedSubmission = await getSubmissions(token, {
  //           assignmentId,
  //         });
  //         if (loadedSubmission) {
  //           // setSubmission(loadedSubmission);
  //           setChances(loadedSubmission.numOfQuestions);
  //           // setSubmissionId(loadedSubmission._id);

  //           // Load chat history from submissionModel
  //           if (
  //             loadedSubmission.chatHistory &&
  //             loadedSubmission.chatHistory.length > 0
  //           ) {
  //             const loadedMessages = loadedSubmission.chatHistory.map(
  //               (chat, index) => ({
  //                 text: chat.content,
  //                 sender: chat.role === 'user' ? 'user' : 'bot',
  //                 id: index, // Generate a key using the index
  //               }),
  //             );
  //             setMessages(loadedMessages);
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       enqueueSnackbar(`Error fetching token or submission:${error}`, {
  //         variant: 'error',
  //         autoHideDuration: 5000,
  //       });
  //     } finally {
  //       setIsLoading(false); // End loading state when data is fetched
  //     }
  //   };
  //   // fetchTokenAndSubmission();
  //   func();
  // }, [getAccessTokenSilently, assignmentId]);

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
      enqueueSnackbar(
        'Sorry, your browser does not support speech synthesis.',
        {
          variant: 'error',
          autoHideDuration: 5000,
        },
      );
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
    // eslint-disable-next-line no-alert
    alert(voiceError);
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
      <div
        style={{
          textAlign: 'center',
          fontFamily: 'var(--main)', // Assuming CSS variables are being used in the project
          fontSize: 'var(--message)', // Same for this
          fontWeight: 600,
          color: 'var(--text)', // Using CSS variable for color
          padding: '10px 0',
        }}
      >
        <span>
          VOICE:You have <strong>{chances}</strong>{' '}
          {chances === 1 ? 'chance ' : 'chances '}
          to talk to
          <strong> Dr Zhou</strong>
        </span>
      </div>
      {isLoading && <div>Loading...</div>}
      <div className="vcb-messages">
        {messages.map((msg, i) =>
          VoiceChatMessage(
            msg,
            () => speakText(msg.text),
            textShow,
            setTextShow,
            i,
          ),
        )}
      </div>

      {inputBar}
    </div>
  );
}

export default VoiceChatBox;
