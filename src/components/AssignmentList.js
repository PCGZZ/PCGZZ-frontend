import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import '../styles/AssignmentList.css'; // Ensure this file exists and is correctly placed

function AssignmentDetail() {
  return (
    <div className="assignment-detail-page">
      <SearchBar />
      <Sidebar />

      <div className="assignment-detail-container">
        <h1 className="assignment-title">Major Depressive Disorder</h1>

        <div className="assignment-section">
          <h2 className="section-title">Assignment Description</h2>
          <p className="section-content">
            Characterized by persistent feelings of sadness, loss of interest,
            and other emotional and physical symptoms.
          </p>
        </div>

        <div className="assignment-section">
          <div className="release-date">
            <h3 className="section-title">Release Date</h3>
            <p className="section-content">23 - 09 - 2024</p>
          </div>
          <div className="close-date">
            <h3 className="section-title">Close Date</h3>
            <p className="section-content">23 - 10 - 2024</p>
          </div>
        </div>

        <div className="assignment-section">
          <h3 className="section-title">Number of Students Questions</h3>
          <p className="section-content">10</p>
        </div>
      </div>

      <div className="navigate-virtual-adult">
        <Link to="/virtual-adult" className="virtual-adult-link">
          <button className="navigate-button" type="button">
            Chat with your virtual interviewee now!
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AssignmentDetail;
