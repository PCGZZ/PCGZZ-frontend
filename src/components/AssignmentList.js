import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import '../styles/AssignmentDetail.css';

function AssignmentDetail() {
  const [activeTab, setActiveTab] = useState('description');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="assignment-detail-page">
      {/* Sidebar and Search Bar */}
      <SearchBar />
      <Sidebar />

      <div className="assignment-detail-container">
        <h1 className="assignment-title">Major Depressive Disorder</h1>

        {/* Tab Navigation */}
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
            type="button"
            onClick={() => handleTabClick('description')}
          >
            Assignment Description
          </button>
          <button
            className={`tab-button ${activeTab === 'virtual-adult' ? 'active' : ''}`}
            type="button"
            onClick={() => handleTabClick('virtual-adult')}
          >
            Virtual Adult
          </button>
          <button
            className={`tab-button ${activeTab === 'student-transcripts' ? 'active' : ''}`}
            type="button"
            onClick={() => handleTabClick('student-transcripts')}
          >
            Student Transcripts
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'description' && (
          <div className="tab-content">
            <div className="assignment-info">
              <div>
                <div className="assignment-section">
                  <h3 className="section-title">Title of Assignment</h3>
                  <p className="section-content">Major Depressive Disorder</p>
                </div>
                <div className="assignment-section">
                  <h3 className="section-title">
                    Number of Students Questions
                  </h3>
                  <p className="section-content">10</p>
                </div>
              </div>
              <div className="assignment-description assignment-section">
                <h3 className="section-title">Assignment Description</h3>
                <p className="section-content">
                  Characterized by persistent feelings of sadness, loss of
                  interest, and other emotional and physical symptoms.
                </p>
              </div>
            </div>
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
        )}

        {activeTab === 'virtual-adult' && (
          <div className="tab-content">
            <div className="assignment-info">
              <div className="assignment-section">
                <h3 className="section-title">Name of Virtual Adult</h3>
                <p className="section-content">Dr Zhou</p>
              </div>
              <div className="assignment-section">
                <h3 className="section-title">AI Model</h3>
                <p className="section-content">Chat GPT 4</p>
              </div>
            </div>
            <div className="assignment-section">
              <h3 className="section-title">Photo of Virtual Adult</h3>
              <img
                src="path-to-photo"
                alt="Dr Zhou"
                className="virtual-adult-photo"
              />
            </div>
            <div className="assignment-section">
              <h3 className="section-title">Upload Scenario</h3>
              <p className="section-content">
                Bipolar_scenario.pdf (Completed)
              </p>
            </div>
          </div>
        )}

        {activeTab === 'student-transcripts' && (
          <div className="tab-content">
            <h2 className="section-title">Students Transcripts</h2>
            <table className="transcripts-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Student ID</th>
                  <th>Student Email</th>
                  <th>Transcripts Summary</th>
                  <th>Transcripts</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Amy</td>
                  <td>101171098</td>
                  <td>name@username.deakin.edu.au</td>
                  <td>
                    <Link to="/transcript-amy">Click to see</Link>
                  </td>
                  <td>
                    <Link to="/transcript-amy">Click to see</Link>
                  </td>
                </tr>
                <tr>
                  <td>Bob</td>
                  <td>101171098</td>
                  <td>name@username.deakin.edu.au</td>
                  <td>
                    <Link to="/transcript-bob">Click to see</Link>
                  </td>
                  <td>
                    <Link to="/transcript-bob">Click to see</Link>
                  </td>
                </tr>
                <tr>
                  <td>Cathy</td>
                  <td>101171098</td>
                  <td>name@username.deakin.edu.au</td>
                  <td>
                    <Link to="/transcript-cathy">Click to see</Link>
                  </td>
                  <td>
                    <Link to="/transcript-cathy">Click to see</Link>
                  </td>
                </tr>
                <tr>
                  <td>David</td>
                  <td>101171098</td>
                  <td>name@username.deakin.edu.au</td>
                  <td>
                    <Link to="/transcript-david">Click to see</Link>
                  </td>
                  <td>
                    <Link to="/transcript-david">Click to see</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignmentDetail;
