import React from 'react';
import '../styles/AssignmentDetail.css';

function AssignmentList() {
  return (
    <div className="assignment-detail-container">
      <div className="assignment-header">Assignment Description</div>

      <div className="assignment-section">
        <div className="section-title">Title of Assignment</div>
        <div className="section-content">Major Depressive Disorder</div>
      </div>

      <div className="assignment-section">
        <div className="section-title">Assignment Description</div>
        <div className="section-content">
          Characterized by persistent feelings of sadness, loss of interest, and
          other emotional and physical symptoms.
        </div>
      </div>

      <div className="assignment-section">
        <div className="release-date">
          <div className="section-title">Release Date</div>
          <div className="section-content">23 - 09 - 2024</div>
        </div>
        <div className="close-date">
          <div className="section-title">Close Date</div>
          <div className="section-content">23 - 10 - 2024</div>
        </div>
      </div>

      <div className="assignment-section">
        <div className="section-title">Number of Students Questions</div>
        <div className="section-content">10</div>
      </div>
    </div>
  );
}

export default AssignmentList;
