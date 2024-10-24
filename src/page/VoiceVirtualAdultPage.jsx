import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

import '../styles/App.css';
import VoiceChatBox from '../components/VoiceChatBox';

function VoiceVirtualAdultPage() {
  const { assignmentId } = useParams();
  return (
    <>
      <Sidebar />
      <div className="main-layout">
        <VoiceChatBox assignmentId={assignmentId} />
      </div>
    </>
  );
}

export default VoiceVirtualAdultPage;
