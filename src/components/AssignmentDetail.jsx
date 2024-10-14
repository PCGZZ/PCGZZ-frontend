import axios from 'axios';
import { Buffer } from 'buffer';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import '../styles/NewAssignment.css';
import '../styles/assignments.css';
import fetchAccessToken from './Auth0Authen';
import { BACKEND_API, AUTH0_API_IDENTIFIER, AUTH0_SCOPE } from '../config';

function AssignmentDetail() {
  const { id: asmtId } = useParams();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    numOfQuestions: '',
    releaseDate: '',
    closeDate: '',
  });
  const [vaData, setVaData] = useState({
    id: '',
    name: '',
    scenario: null,
    photo: null,
    aiModel: '',
  });

  const retrieveAsmt = useCallback(
    async (tok) => {
      try {
        const res = await axios.get(`${BACKEND_API}/assignment?id=${asmtId}`, {
          headers: {
            Authorization: `Bearer ${tok}`,
            'Content-Type': 'application/json',
          },
        });
        if (res.data.ok) {
          setAssignmentData((prevData) => ({
            ...prevData,
            title: res.data.assignment.title,
            description: res.data.assignment.description,
            numOfQuestions: res.data.assignment.numOfQuestions,
            releaseDate: new Date(
              res.data.assignment.releaseDate,
            ).toLocaleDateString(),
            closeDate: new Date(
              res.data.assignment.dueDate,
            ).toLocaleDateString(),
          }));
          setVaData((prevData) => ({
            ...prevData,
            id: res.data.assignment.virtualAdult,
          }));
          return res.data.assignment.virtualAdult;
        }
      } catch (error) {
        console.error('Error fetching assignment:', error);
      }
    },
    [asmtId],
  );

  const retrieveVA = useCallback(async (vaId, tok) => {
    try {
      const res = await axios.get(`${BACKEND_API}/va?id=${vaId}`, {
        headers: {
          Authorization: `Bearer ${tok}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.data.ok) {
        let base64Photo = null;

        if (res.data.va.photo && res.data.va.photo.data.type === 'Buffer') {
          const buffer = Buffer.from(res.data.va.photo.data.data).toString(
            'base64',
          );
          base64Photo = `data:image/jpeg;base64,${buffer}`;
        }

        setVaData((prevData) => ({
          ...prevData,
          name: res.data.va.name,
          scenario: res.data.va.scenario,
          photo: base64Photo,
          aiModel: res.data.va.AI_model,
        }));
      }
    } catch (error) {
      console.error('Error fetching virtual adult:', error);
    }
  }, []);

  const fetchTokenAndPerform = useCallback(async () => {
    try {
      setLoading(true);
      const token = await fetchAccessToken({
        getAccessTokenSilently,
        getAccessTokenWithPopup,
        AUTH0_API_IDENTIFIER,
        AUTH0_SCOPE,
      });

      if (token) {
        const vaId = await retrieveAsmt(token);
        if (vaId) {
          await retrieveVA(vaId, token);
        }
      }
    } catch (error) {
      console.error('Error fetching token or assignments:', error);
    } finally {
      setLoading(false);
    }
  }, [
    getAccessTokenSilently,
    getAccessTokenWithPopup,
    retrieveAsmt,
    retrieveVA,
  ]);

  useEffect(() => {
    fetchTokenAndPerform();
  }, [fetchTokenAndPerform]);

  return (
    <>
      <SearchBar />
      <Sidebar />
      <div className="main-layout">
        <div className="main-content">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <h2 className="sub-heading">{assignmentData.title}</h2>
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
                <button
                  className={`tab-button ${activeTab === 'students-transcripts' ? 'active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('students-transcripts')}
                >
                  Students Transcripts
                </button>
              </div>

              {activeTab === 'description' && (
                <div className="form-container">
                  <div className="form-section">
                    <h3 className="section-title">Title of Assignment</h3>
                    <p className="section-content">{assignmentData.title}</p>
                  </div>

                  <div className="form-section">
                    <h3 className="section-title">
                      Number of Students Questions
                    </h3>
                    <p className="section-content">
                      {assignmentData.numOfQuestions}
                    </p>
                  </div>

                  <div className="form-section">
                    <h3 className="section-title">Assignment Description</h3>
                    <p className="section-content">
                      {assignmentData.description}
                    </p>
                  </div>

                  <div className="form-section">
                    <h3 className="section-title">Release Date</h3>
                    <p className="section-content">
                      {assignmentData.releaseDate}
                    </p>
                  </div>

                  <div className="form-section">
                    <h3 className="section-title">Close Date</h3>
                    <p className="section-content">
                      {assignmentData.closeDate}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'virtual-adult' && (
                <div className="form-container">
                  <div className="form-section">
                    <h3 className="section-title">Name of Virtual Adult</h3>
                    <p className="section-content">{vaData.name}</p>
                  </div>

                  <div className="form-section">
                    <h3 className="section-title">AI Model</h3>
                    <p className="section-content">{vaData.aiModel}</p>
                  </div>

                  <div className="form-section">
                    <h3 className="section-title">Photo of Virtual Adult</h3>
                    {vaData.photo ? (
                      <img
                        className="virtual-adult-photo"
                        src={vaData.photo}
                        alt="Virtual Adult"
                      />
                    ) : (
                      <p>No uploaded photo</p>
                    )}
                  </div>

                  <div className="form-section">
                    <h3 className="section-title">Scenario</h3>
                    <p className="section-content">
                      {vaData.scenario || 'No scenario uploaded'}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AssignmentDetail;
