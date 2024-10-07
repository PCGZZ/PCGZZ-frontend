import React from 'react';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CircleIcon from '@mui/icons-material/Circle';
// import Tooltip from '@mui/material/Tooltip';
import avatarKris from '../styles/image/avatar_account.jpg'; // Adjust the path
import avatarTeacher from '../styles/image/virtual-adult.jpg'; // Import the teacher's avatar
import '../styles/VoiceMessage.css';

function VoiceChatMessage(
  { sender, text, id },
  speakText,
  showText,
  setTextShow,
  i,
) {
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

  const lightT = (
    <svg
      width="14"
      height="17"
      viewBox="0 0 14 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 15.875H7M7 15.875H9M7 15.875V1.875M7 1.875H1V2.875M7 1.875H13V2.875"
        stroke="#60D1C4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const colorDark = '#339CAB';
  const colorLight = '#8FDFE438';

  //   const [showText, setShowText] = useState(false);
  //   const showText = false;
  const colorBoxBg = sender === 'user' ? '#DEDEDE4D' : '#C5FCFF33';
  const toggleText = () => {
    // console.log('toggleText');
    // eslint-disable-next-line
    console.log(showText);
    const newTextShow = showText;
    newTextShow[i] = !newTextShow[i];
    setTextShow(newTextShow);
  };

  const messageBox = (
    <div className="vcb-message-display-user" style={{ color: colorBoxBg }}>
      <IconButton
        className="vmessage-button-stack-container"
        onClick={() => {
          speakText();
        }}
        style={{ fontSize: '32' }}
      >
        <CircleIcon
          className="vmessage-button-stack-item"
          style={{ color: colorLight, fontSize: '32' }}
        />
        <PlayArrowIcon
          className="vmessage-button-stack-item"
          style={{ color: colorDark, fontSize: '32' }}
        />
      </IconButton>

      {waveSvg}
      {/* <Tooltip title={text}> */}
      <IconButton onClick={toggleText}>{lightT}</IconButton>
      {/* </Tooltip> */}
    </div>
  );

  const orderedChat =
    sender === 'user' ? (
      <>
        {messageBox}
        <img
          className="avatar"
          src={sender === 'user' ? avatarKris : avatarTeacher}
          alt={`${sender} avatar`}
        />
      </>
    ) : (
      <>
        <img
          className="avatar"
          src={sender === 'user' ? avatarKris : avatarTeacher}
          alt={`${sender} avatar`}
        />
        {messageBox}
      </>
    );

  if (showText[i]) {
    return (
      <div key={id} style={{ alignItems: 'right' }}>
        <div className={`vcb-message ${sender}`}>{orderedChat}</div>

        <div style={{ paddingBottom: '15px' }}>
          <div className="vmessage-textbox" style={{ background: colorBoxBg }}>
            <p>{text}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div key={id}>
      <div className={`vcb-message ${sender}`}>{orderedChat}</div>
    </div>
  );
}

export default VoiceChatMessage;
