import React from 'react';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';
import '../styles/App.css';

function VirtualAdultPage() {
  return (
    <>
      <Sidebar />
      <div className="main-layout">
        <ChatBox />
      </div>
    </>
  );
}

export default VirtualAdultPage;
