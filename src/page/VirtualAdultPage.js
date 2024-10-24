import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';
import '../styles/App.css';

function VirtualAdultPage() {
  const { assignmentId } = useParams();
  return (
    <>
      <Sidebar />
      <div className="main-layout">
        <ChatBox assignmentId={assignmentId} />
      </div>
    </>
  );
}

export default VirtualAdultPage;
