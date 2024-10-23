import axios from 'axios';
import React, { useState } from 'react';
import '../styles/NewAssignment.css';
import '../styles/assignments.css';
import { useAuth0 } from '@auth0/auth0-react';
import fetchAccessToken from '../api/Authen';
import { BACKEND_API, AUTH0_API_IDENTIFIER, AUTH0_SCOPE } from '../config';

function NewAssignmentPage({ onSave, onCancel }) {
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const [activeTab, setActiveTab] = useState('description');
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    numOfQuestions: '',
    releaseDate: '',
    closeDate: '',
    virtualAdultName: '',
    aiModel: 'Chat GPT 4',
    virtualAdultPhoto: null,
    scenarioFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'numOfQuestions') {
      if (
        (value === '' || /^[0-9]+$/.test(value)) &&
        value > 0 &&
        value < 100
      ) {
        setAssignmentData({ ...assignmentData, [name]: value });
      }
    } else {
      setAssignmentData({ ...assignmentData, [name]: value });
    }
  };

  const handleFileUpload = (e) => {
    const { name } = e.target;
    setAssignmentData({ ...assignmentData, [name]: e.target.files[0] });
  };

  const createVA = async (tok) => {
    try {
      const formData = new FormData();
      formData.append('name', assignmentData.virtualAdultName);
      formData.append('description', 'null');
      formData.append('scenario', assignmentData.scenarioFile);
      formData.append('photo', assignmentData.virtualAdultPhoto);
      formData.append('AI_model', assignmentData.aiModel);

      const res = await axios.post(`${BACKEND_API}/va`, formData, {
        headers: {
          Authorization: `Bearer ${tok}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.ok) {
        console.log('VA created successfully:', res.data.message);
        return res.data.va._id;
      }
      throw new Error('Failed to create virtual adult');
    } catch (error) {
      console.error('Error creating VA:', error);
      throw error;
    }
  };

  const createAsmt = async (tok, vaId) => {
    try {
      const res = await axios.post(
        `${BACKEND_API}/assignment`,
        {
          title: assignmentData.title,
          description: assignmentData.description,
          numOfQuestions: assignmentData.numOfQuestions,
          releaseDate: assignmentData.releaseDate,
          dueDate: assignmentData.closeDate,
          virtualAdult: vaId,
        },
        {
          headers: {
            Authorization: `Bearer ${tok}`,
          },
        },
      );

      if (res.data.ok) {
        console.log(res.data.message);
        return;
      }
      throw new Error('Failed to create assignment');
    } catch (error) {
      console.error('Error creating assignment:', error);
      throw error;
    }
  };

  const createVAandAsmt = async () => {
    try {
      const token = await fetchAccessToken({
        getAccessTokenSilently,
        getAccessTokenWithPopup,
        AUTH0_API_IDENTIFIER,
        AUTH0_SCOPE,
      });
      console.log('Access Token');

      // call api to creat VA and assignment
      if (token) {
        const VAid = await createVA(token);
        await createAsmt(token, VAid);
      }
    } catch (error) {
      console.error('Error fetching token or create assignments:', error);
    }
  };

  const handleSave = () => {
    const requiredFields = [
      'title',
      'description',
      'numOfQuestions',
      'releaseDate',
      'closeDate',
      'virtualAdultName',
      'scenarioFile',
    ];

    const emptyFields = requiredFields.filter(
      (field) => !assignmentData[field],
    );

    if (emptyFields.length > 0) {
      alert('Please fill all fields.');
      return;
    }
    createVAandAsmt();

    onSave(assignmentData);
  };

  const handleCancel = () => {
    if (
      window.confirm(
        'Are you sure you want to cancel creating a new assignment?',
      )
    ) {
      onCancel();
    }
  };

  return (
    <div className="main-content">
      <h2 className="sub-heading">New Assignment</h2>
      <div className="action-buttons">
        <button className="save-button" type="button" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-button" type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
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
        <>
          <div className="form-container">
            <div className="form-info">
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
                <h3 className="section-title">Number of Students Questions</h3>
                <input
                  type="number"
                  name="numOfQuestions"
                  placeholder="Number of questions each student can ask"
                  value={assignmentData.numOfQuestions}
                  onChange={handleChange}
                  min="1"
                />
              </div>
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
          </div>

          <div className="form-container">
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
        </>
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
              <option value="Chat GPT 4o">Chat GPT 4o</option>
              <option value="Chat GPT 4o mini">Chat GPT 4o mini</option>
            </select>
          </div>

          <div className="form-section">
            <h3 className="section-title">Photo of Virtual Adult</h3>
            <input
              type="file"
              name="virtualAdultPhoto"
              accept="image/jpeg"
              onChange={handleFileUpload}
            />
            <p style={{ color: '#828282' }}>
              Only .jpeg or .jpg files are accepted
            </p>
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
            <p style={{ color: '#828282' }}>
              Only .txt or .pdf files are accepted
            </p>
            {assignmentData.scenarioFile && (
              <div className="file-preview">
                {assignmentData.scenarioFile.name} -{' '}
                {Math.round(assignmentData.scenarioFile.size / 1024)} KB
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NewAssignmentPage;
