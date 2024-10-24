import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import '../styles/assignments.css';

function Transcript({ submissionId }) {
  return (
    <div className="main-content">
      <h2 className="sub-heading">Transcript</h2>
      <div className="assignment-actions">
        <ArrowBackIcon sx={{ color: 'var(--darker)' }} />
      </div>
    </div>
  );
}

export default Transcript;
