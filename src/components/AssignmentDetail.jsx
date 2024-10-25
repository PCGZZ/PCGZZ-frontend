import axios from 'axios';
import { Buffer } from 'buffer';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Sidebar from './Sidebar';
import '../styles/NewAssignment.css';
import '../styles/assignments.css';
import fetchAccessToken from '../api/Authen';
import { BACKEND_API, AUTH0_API_IDENTIFIER, AUTH0_SCOPE } from '../config';
import { getUserRole } from '../api/user.api';
import FileDownload from '../api/FileDownload';
import StartChat from '../api/StartChat';
import { getSubmissionList } from '../api/submission.api';
import TranscriptModal from './TranscriptModal';

function AssignmentDetail() {
  const [role, setRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id: asmtId } = useParams();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    numOfQuestions: '',
    isVoice: false,
    releaseDate: '',
    closeDate: '',
  });
  const [vaData, setVaData] = useState({
    id: '',
    name: '',
    scenario: null,
    photo: null,
    AI_model: '',
  });
  const [originalVaData, setOriginalVaData] = useState({
    id: '',
    name: '',
    scenario: null,
    photo: null,
    AI_model: '',
  });
  const submissions = useMemo(() => [], []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState(null);

  const handleViewTranscript = async (subm) => {
    try {
      await setCurrentSubmission(subm);
      await setIsModalOpen(true);
    } catch (error) {
      console.error('Error in handleViewTranscript:', error);
    }
  };

  const handleViewTranscriptSummary = async (subm) => {
    try {
      await setCurrentSubmission(subm);
      await setIsModalOpen(true);
    } catch (error) {
      console.error('Error in handleViewTranscript:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    setVaData({
      ...vaData,
      [name]: files[0],
    });
  };

  const checkUpdatedVaData = useCallback(() => {
    const changedData = new FormData();
    Object.entries(vaData).forEach(([key, value]) => {
      if (value !== originalVaData[key] && key !== 'id') {
        changedData.append(key, value);
      }
    });
    return changedData;
  }, [originalVaData, vaData]);

  const updateVA = useCallback(
    async (tok) => {
      try {
        const changedData = checkUpdatedVaData();
        const res = await axios.patch(
          `${BACKEND_API}/va?id=${originalVaData.id}`,
          changedData,
          {
            headers: {
              Authorization: `Bearer ${tok}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        if (res.data.ok) {
          console.log(res.data.message);
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Error updating virtual adult:', error);
      }
    },
    [checkUpdatedVaData, originalVaData.id],
  );

  const updateAsmt = useCallback(
    async (tok) => {
      try {
        const res = await axios.patch(
          `${BACKEND_API}/assignment?id=${asmtId}`,
          assignmentData,
          {
            headers: {
              Authorization: `Bearer ${tok}`,
              'Content-Type': 'application/json',
            },
          },
        );

        if (res.data.ok) {
          console.log(res.data.message);
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Error updating assignment:', error);
      }
    },
    [asmtId, assignmentData],
  );

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
            isVoice: res.data.assignment.isVoice,
            releaseDate: new Date(
              res.data.assignment.releaseDate,
            ).toLocaleDateString(),
            closeDate: new Date(
              res.data.assignment.dueDate,
            ).toLocaleDateString(),
          }));
          setOriginalVaData((prevData) => ({
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

        let resScenario = null;
        if (res.data.va.scenario?.data?.data) {
          resScenario = {
            data: Buffer.from(res.data.va.scenario.data.data).toString(
              'base64',
            ),
            contentType: res.data.va.scenario.contentType,
            filename: res.data.va.scenario.filename,
          };
        }

        setOriginalVaData((prevData) => ({
          ...prevData,
          name: res.data.va.name,
          scenario: resScenario,
          photo: base64Photo,
          AI_model: res.data.va.AI_model,
        }));

        setVaData((prevData) => ({
          ...prevData,
          id: res.data.va._id,
          name: res.data.va.name,
          scenario: resScenario,
          photo: base64Photo,
          AI_model: res.data.va.AI_model,
        }));
      }
    } catch (error) {
      console.error('Error fetching virtual adult:', error);
    }
  }, []);

  const createSubmissions = useCallback(
    async (tok) => {
      try {
        const submissionLi = await getSubmissionList(tok, asmtId);
        submissionLi.forEach((subm) => {
          const submObject = {
            id: subm.submissionId,
            email: subm.student.email,
            name: subm.student.name,
          };
          const index = submissions.findIndex(
            (existingSubm) => existingSubm.id === submObject.id,
          );
          if (index !== -1) {
            submissions[index] = submObject;
          } else {
            submissions.push(submObject);
          }
        });
      } catch (error) {
        console.error('Error creating submissions:', error);
      }
    },
    [submissions, asmtId],
  );

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
        const userRole = await getUserRole(token);
        if (userRole) {
          setRole(userRole);
        }
        const vaId = await retrieveAsmt(token);
        if (vaId) {
          await retrieveVA(vaId, token);
          if (userRole !== 'student') {
            await createSubmissions(token);
          }
          console.log(
            'successfully fetch asmt, virtual adult and submission list',
          );
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
    createSubmissions,
  ]);

  const handleSaveAsmt = async () => {
    const requiredFields = [
      'title',
      'description',
      'numOfQuestions',
      'releaseDate',
      'closeDate',
    ];
    const emptyFields = requiredFields.filter(
      (field) => !assignmentData[field],
    );

    if (emptyFields.length > 0) {
      alert('Please fill all fields.');
      return;
    }

    const token = await fetchAccessToken({
      getAccessTokenSilently,
      getAccessTokenWithPopup,
      AUTH0_API_IDENTIFIER,
      AUTH0_SCOPE,
    });

    if (token) {
      await updateAsmt(token);
      await updateVA(token);
      await fetchTokenAndPerform();
    }
  };

  useEffect(() => {
    fetchTokenAndPerform();
    if (currentSubmission) {
      setIsModalOpen(true);
    }
  }, [fetchTokenAndPerform, currentSubmission]);

  return (
    <>
      <Sidebar />
      <div className="main-layout">
        <div className="main-content">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <h2 className="sub-heading">
                {assignmentData?.title}
                <div className="assignment-actions">
                  {!isEditing && (
                    <IconButton className="back-arrow">
                      <Link to="/assignments">
                        <ArrowBackIcon sx={{ color: 'var(--darker)' }} />
                      </Link>
                    </IconButton>
                  )}
                  {(role === 'educator' || role === 'admin') && (
                    <>
                      {isEditing && (
                        <button
                          className="save-button"
                          type="button"
                          onClick={handleSaveAsmt}
                        >
                          Save
                        </button>
                      )}
                      <button
                        className="edit-button"
                        type="button"
                        onClick={handleEdit}
                      >
                        {isEditing ? 'Cancel Edit' : 'Edit'}
                      </button>
                    </>
                  )}
                </div>
              </h2>

              <div className="tabs">
                <button
                  className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('description')}
                >
                  Assignment Description
                </button>

                {/* Only show the Virtual Adult and Students Transcripts tabs for educators/admins */}
                {role !== 'student' && (
                  <>
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
                  </>
                )}
              </div>

              {/* Description Section */}
              {activeTab === 'description' && (
                <div>
                  <div className="form-container">
                    <div className="form-section">
                      <h3 className="section-title">Title of Assignment</h3>
                      {isEditing ? (
                        <input
                          type="text"
                          value={assignmentData?.title}
                          onChange={(e) =>
                            setAssignmentData({
                              ...assignmentData,
                              title: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <p className="section-content">
                          {assignmentData?.title}
                        </p>
                      )}
                    </div>

                    <div className="form-section">
                      <h3 className="section-title">
                        Number of Students Questions
                      </h3>
                      {isEditing ? (
                        <input
                          type="number"
                          value={assignmentData?.numOfQuestions}
                          onChange={(e) =>
                            setAssignmentData({
                              ...assignmentData,
                              numOfQuestions: e.target.value,
                            })
                          }
                          min="1"
                        />
                      ) : (
                        <p className="section-content">
                          {assignmentData?.numOfQuestions}
                        </p>
                      )}
                    </div>

                    <div className="form-section">
                      <h3 className="section-title">Assignment Description</h3>
                      {isEditing ? (
                        <textarea
                          name="description"
                          value={assignmentData?.description}
                          onChange={(e) =>
                            setAssignmentData({
                              ...assignmentData,
                              description: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <p className="section-content">
                          {assignmentData?.description}
                        </p>
                      )}
                    </div>

                    <div className="form-section">
                      <h3 className="section-title">Interaction Mode</h3>
                      {isEditing ? (
                        <select
                          name="interaction_mode"
                          value={
                            assignmentData?.isVoice === true ? 'Verbal' : 'Text'
                          }
                          onChange={(e) =>
                            setAssignmentData({
                              ...assignmentData,
                              isVoice: e.target.value === 'Verbal',
                            })
                          }
                        >
                          <option value="Text">Text</option>
                          <option value="Verbal">Verbal</option>
                        </select>
                      ) : (
                        <p className="section-content">
                          {assignmentData?.isVoice === true ? 'Verbal' : 'Text'}
                        </p>
                      )}
                    </div>

                    <div className="form-section">
                      <h3 className="section-title">Release Date</h3>
                      {isEditing ? (
                        <input
                          type="date"
                          name="releaseDate"
                          value={assignmentData?.releaseDate}
                          onChange={(e) =>
                            setAssignmentData({
                              ...assignmentData,
                              releaseDate: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <p className="section-content">
                          {assignmentData?.releaseDate}
                        </p>
                      )}
                    </div>

                    <div className="form-section">
                      <h3 className="section-title">Close Date</h3>
                      {isEditing ? (
                        <input
                          type="date"
                          name="closeDate"
                          value={assignmentData?.closeDate}
                          onChange={(e) =>
                            setAssignmentData({
                              ...assignmentData,
                              closeDate: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <p className="section-content">
                          {assignmentData?.closeDate}
                        </p>
                      )}
                    </div>
                  </div>
                  <StartChat
                    assignmentId={asmtId}
                    isVoiceMode={assignmentData.isVoice}
                  />
                </div>
              )}

              {/* Virtual Adult Section: Visible only if not a student */}
              {activeTab === 'virtual-adult' && role !== 'student' && (
                <div className="form-container">
                  <div className="form-section">
                    <h3 className="section-title">Name of Virtual Adult</h3>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={vaData?.name}
                        onChange={(e) =>
                          setVaData({ ...vaData, name: e.target.value })
                        }
                      />
                    ) : (
                      <p className="section-content">{originalVaData?.name}</p>
                    )}
                  </div>
                  {/* AI Model Section */}
                  <div className="form-section">
                    <h3 className="section-title">AI Model</h3>
                    {isEditing ? (
                      <select
                        name="AI_model"
                        value={vaData.AI_model}
                        onChange={(e) =>
                          setVaData({
                            ...vaData,
                            AI_model: e.target.value,
                          })
                        }
                      >
                        <option value="Chat GPT 4o">Chat GPT 4o</option>
                        <option value="Chat GPT 4o mini">
                          Chat GPT 4o mini
                        </option>
                      </select>
                    ) : (
                      <p className="section-content">
                        {originalVaData.AI_model}
                      </p>
                    )}
                  </div>

                  {/* Photo Section */}
                  <div className="form-section">
                    <h3 className="section-title">Photo of Virtual Adult</h3>
                    <div className="section-content">
                      {isEditing ? (
                        <div>
                          {vaData.photo ? (
                            <div>
                              <img
                                className="virtual-adult-photo"
                                src={
                                  vaData.photo instanceof File
                                    ? URL.createObjectURL(vaData.photo)
                                    : vaData.photo
                                }
                                alt="Virtual Adult"
                              />
                              <p>Currently uploaded photo</p>
                            </div>
                          ) : (
                            <p>You have not uploaded photo</p>
                          )}
                          <input
                            type="file"
                            name="photo"
                            accept="image/jpeg"
                            onChange={handleFileUpload}
                          />
                          <p>Only .jpeg or .jpg files are accepted</p>
                        </div>
                      ) : (
                        <div>
                          {originalVaData.photo ? (
                            <>
                              <img
                                className="virtual-adult-photo"
                                src={originalVaData.photo}
                                alt="Virtual Adult"
                              />
                              <a
                                href={originalVaData.photo}
                                download="virtual_adult.jpg"
                                className="download-button"
                              >
                                Download virtual_adult.jpg
                              </a>
                            </>
                          ) : (
                            <p>No photo uploaded</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Scenario Section */}
                  <div className="form-section">
                    <h3 className="section-title">Scenario</h3>
                    <div className="section-content">
                      {isEditing ? (
                        <>
                          {vaData.scenario ? (
                            <div>
                              <p>Currently uploaded scenario</p>
                            </div>
                          ) : (
                            <div>
                              <p>
                                You have not uploaded scenario, please upload
                                scenario
                              </p>
                            </div>
                          )}
                          <input
                            type="file"
                            name="scenario"
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={handleFileUpload}
                          />
                          <p style={{ color: '#828282' }}>
                            Only .txt or .pdf files are accepted
                          </p>
                        </>
                      ) : (
                        <div>
                          {originalVaData.scenario ? (
                            <FileDownload
                              base64Data={originalVaData.scenario.data}
                              fileType={originalVaData.scenario.contentType}
                              fileName={originalVaData.scenario.filename}
                            />
                          ) : (
                            <p>No scenario uploaded</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Students Transcripts Section: Visible only if not a student */}
              {activeTab === 'students-transcripts' && role !== 'student' && (
                <div className="form-section">
                  <table className="transcripts-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Transcripts Summary</th>
                        <th>Transcripts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions?.length > 0 ? (
                        submissions.map((subm) => (
                          <tr key={subm.id}>
                            <td>{subm.name}</td>
                            <td>{subm.email}</td>
                            <td>
                              <button
                                className="transcript-button"
                                type="button"
                                onClick={() =>
                                  handleViewTranscriptSummary(subm)
                                }
                              >
                                Click to see
                              </button>
                            </td>
                            <td>
                              <button
                                className="transcript-button"
                                type="button"
                                onClick={() => handleViewTranscript(subm)}
                              >
                                Click to see
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="15">No transcripts.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {isModalOpen && (
                    <TranscriptModal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      submission={currentSubmission}
                    />
                  )}
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
