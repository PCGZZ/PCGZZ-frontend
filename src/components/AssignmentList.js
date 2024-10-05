import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import '../styles/AssignmentList.css'; // Ensure this file exists and is correctly placed

function AssignmentDetail() {
  return (
    <div className="assignment-detail-page">
      {/* Sidebar and Search Bar */}
      <SearchBar />
      <Sidebar />

      {/* Assignment Detail Container */}
      <div className="assignment-detail-container">
        <h1 className="assignment-title">Major Depressive Disorder</h1>

        <div className="assignment-info">
          {/* Left Side: Title and Number of Students */}
          <div>
            <div className="assignment-section">
              <h3 className="section-title">Title of Assignment</h3>
              <p className="section-content">Major Depressive Disorder</p>
            </div>

            <div className="assignment-section">
              <h3 className="section-title">Number of Students Questions</h3>
              <p className="section-content">10</p>
            </div>
          </div>

          {/* Right Side: Assignment Description */}
          <div className="assignment-description assignment-section">
            <h3 className="section-title">Assignment Description</h3>
            <p className="section-content">
              Characterized by persistent feelings of sadness, loss of interest,
              and other emotional and physical symptoms.
            </p>
          </div>
        </div>

        {/* Release and Close Date */}
        <div className="release-close-container">
          <div className="release-date">
            <h3 className="section-title">Release Date</h3>
            <p className="section-content">23 - 09 - 2024</p>
          </div>

          <div className="close-date">
            <h3 className="section-title">Close Date</h3>
            <p className="section-content">23 - 10 - 2024</p>
          </div>
        </div>
      </div>

      {/* Chatbox Link at the Bottom */}
      <div className="chatbox-link-container">
        <span className="chatbox-text">
          Chat with your virtual interviewee now!
        </span>
        <Link to="/virtual-adult" className="virtual-adult-link">
          <div className="chatbox-icon">
            {/* SVG icon */}
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4h16v16H4z" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AssignmentDetail;
