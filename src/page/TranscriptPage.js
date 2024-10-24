import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import Transcript from '../components/Transcript';
import '../styles/App.css';

function TranscriptPage() {
  const { submissionId } = useParams();
  return (
    <>
      <SearchBar />
      <Sidebar />
      <div className="main-layout">
        <Transcript submissionId={submissionId} />
      </div>
    </>
  );
}

export default TranscriptPage;
