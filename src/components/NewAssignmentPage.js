import React, { useState } from 'react';
import '../styles/NewAssignment.css';

function NewAssignmentPage({ onSave, onCancel }) {
  const [activeTab, setActiveTab] = useState('description');
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    questions: '',
    releaseDate: '',
    closeDate: '',
    virtualAdultName: '',
    aiModel: 'Chat GPT 4',
    virtualAdultPhoto: null,
    scenarioFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignmentData({ ...assignmentData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const { name } = e.target;
    setAssignmentData({ ...assignmentData, [name]: e.target.files[0] });
  };

  const handleSave = () => {
    onSave(assignmentData);
  };

  return (
    <div className="new-assignment-content">
      <h2 className="sub-heading">New Assignment</h2>

      {/* Tab Navigation */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
          type="button"
          onClick={() => setActiveTab('description')}
        >
          Assignment Description
        </button>
        <button
          className={`tab-button ${activeTab === 'virtual-adult' ? 'active' : ''}`}
          type="button"
          onClick={() => setActiveTab('virtual-adult')}
        >
          Virtual Adult
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'description' && (
        <div className="form-container">
          <div className="form-section">
            <h3 className="section-title">Title of Assignment</h3>
            <input
              type="text"
              name="title"
              placeholder="Type title here..."
              value={assignmentData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <h3 className="section-title">Assignment Description</h3>
            <textarea
              name="description"
              placeholder="Type Assignment Description here..."
              value={assignmentData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <h3 className="section-title">Number of Students Questions</h3>
            <input
              type="text"
              name="questions"
              placeholder="Number of questions each student can ask"
              value={assignmentData.questions}
              onChange={handleChange}
            />
          </div>

          <div className="date-container form-section">
            <div className="form-section">
              <h3 className="section-title">Release Date</h3>
              <input
                type="date"
                name="releaseDate"
                placeholder="dd - mm - yyyy"
                value={assignmentData.releaseDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-section">
              <h3 className="section-title">Close Date</h3>
              <input
                type="date"
                name="closeDate"
                placeholder="dd - mm - yyyy"
                value={assignmentData.closeDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'virtual-adult' && (
        <div className="form-container">
          <div className="form-section">
            <h3 className="section-title">Name of Virtual Adult</h3>
            <input
              type="text"
              name="virtualAdultName"
              placeholder="Type VA's name here..."
              value={assignmentData.virtualAdultName}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <h3 className="section-title">AI Model</h3>
            <select
              name="aiModel"
              value={assignmentData.aiModel}
              onChange={handleChange}
            >
              <option value="Chat GPT 4">Chat GPT 4</option>
              <option value="Chat GPT 4 mini">Chat GPT 4 mini</option>
              <option value="Chat GPT 3.5">Chat GPT 3.5</option>
            </select>
          </div>

          <div className="form-section">
            <h3 className="section-title">Photo of Virtual Adult</h3>
            <input
              type="file"
              name="virtualAdultPhoto"
              accept="image/*"
              onChange={handleFileUpload}
            />
            {assignmentData.virtualAdultPhoto && (
              <div className="file-preview">
                {assignmentData.virtualAdultPhoto.name} -{' '}
                {Math.round(assignmentData.virtualAdultPhoto.size / 1024)} KB
              </div>
            )}
          </div>

          <div className="form-section">
            <h3 className="section-title">Upload Scenario</h3>
            <input
              type="file"
              name="scenarioFile"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
            />
            {assignmentData.scenarioFile && (
              <div className="file-preview">
                {assignmentData.scenarioFile.name} -{' '}
                {Math.round(assignmentData.scenarioFile.size / 1024)} KB
              </div>
            )}
          </div>
        </div>
      )}

      <div className="action-buttons">
        <button className="cancel-button" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="save-button" type="button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default NewAssignmentPage;
