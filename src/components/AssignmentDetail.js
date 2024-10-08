// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import React, { useState } from 'react';
// import '../styles/NewAssignment.css';
// import '../styles/assignments.css';
// import { useAuth0 } from '@auth0/auth0-react';
// import fetchAccessToken from './Auth0Authen';
// import { BACKEND_API, AUTH0_API_IDENTIFIER, AUTH0_SCOPE } from '../config';

// function NewAssignmentPage({ onSave, onCancel }) {
//   const { asmtId } = useParams();
//   const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
//   const [activeTab, setActiveTab] = useState('description');
//   const [loading, setLoading] = useState(true);
//   const [assignmentData, setAssignmentData] = useState({
//     title: '',
//     description: '',
//     numOfQuestions: '',
//     releaseDate: '',
//     closeDate: '',
//     virtualAdultName: '',
//     aiModel: 'Chat GPT 4',
//     virtualAdultPhoto: null,
//     scenarioFile: null,
//   });

//   const getAsmt =

//   const fetchTokenAndPerform = useCallback(async () => {
//     try {
//       setLoading(true);
//       const token = await fetchAccessToken({
//         getAccessTokenSilently,
//         getAccessTokenWithPopup,
//         AUTH0_API_IDENTIFIER,
//         AUTH0_SCOPE,
//       });
//       console.log('Access Token');

//       // call api to perform
//       if (token) {
//         await getRole(token);
//         await retrieveAsmts(token);
//         if (userRole) {
//           setRole(userRole);
//         }
//         if (asmtList) {
//           setAssignments(asmtList);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching token or assignments:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [getAccessTokenSilently, getAccessTokenWithPopup, retrieveAsmts, getRole]);

//   const handleSave = () => {
//     const requiredFields = [
//       'title',
//       'description',
//       'numOfQuestions',
//       'releaseDate',
//       'closeDate',
//       'virtualAdultName',
//     ];
//     const emptyFields = requiredFields.filter(
//       (field) => !assignmentData[field],
//     );

//     if (emptyFields.length > 0) {
//       alert('Please fill all required fields.');
//       return;
//     }

//     onSave(assignmentData);
//   };

//   const handleCancel = () => {
//     if (
//       window.confirm(
//         'Are you sure you want to cancel creating a new assignment?',
//       )
//     ) {
//       onCancel();
//     }
//   };

//   return (
//     <div className="main-content">
//       <h2 className="sub-heading"> {assignmentData.title} </h2>
//       <div className="newasmt_action-buttons">
//         <button
//           className="newasmt_save-button"
//           type="button"
//           onClick={handleSave}
//         >
//           Save
//         </button>
//         <button
//           className="newasmt_cancel-button"
//           type="button"
//           onClick={handleCancel}
//         >
//           Cancel
//         </button>
//       </div>
//       {/* Tab Navigation */}
//       <div className="tabs">
//         <button
//           className={`newasmt_tab-button ${activeTab === 'description' ? 'active' : ''}`}
//           type="button"
//           onClick={() => setActiveTab('description')}
//         >
//           Assignment Description
//         </button>
//         <button
//           className={`newasmt_tab-button ${activeTab === 'virtual-adult' ? 'active' : ''}`}
//           type="button"
//           onClick={() => setActiveTab('virtual-adult')}
//         >
//           Virtual Adult
//         </button>
//       </div>

//       {/* Tab Content */}
//       {activeTab === 'description' && (
//         <>
//           <div className="form-container">
//             <div className="form-info">
//               <div className="form-section">
//                 <h3 className="section-title">Title of Assignment</h3>
//                 <input
//                   type="text"
//                   name="title"
//                   placeholder="Type title here..."
//                   value={assignmentData.title}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="form-section">
//                 <h3 className="section-title">Number of Students Questions</h3>
//                 <input
//                   type="number"
//                   name="numOfQuestions"
//                   placeholder="Number of questions each student can ask"
//                   value={assignmentData.numOfQuestions}
//                   onChange={handleChange}
//                   min="1"
//                 />
//               </div>
//             </div>

//             <div className="form-section">
//               <h3 className="section-title">Assignment Description</h3>
//               <textarea
//                 name="description"
//                 placeholder="Type Assignment Description here..."
//                 value={assignmentData.description}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="form-container">
//             <div className="form-section">
//               <h3 className="section-title">Release Date</h3>
//               <input
//                 type="date"
//                 name="releaseDate"
//                 placeholder="dd - mm - yyyy"
//                 value={assignmentData.releaseDate}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-section">
//               <h3 className="section-title">Close Date</h3>
//               <input
//                 type="date"
//                 name="closeDate"
//                 placeholder="dd - mm - yyyy"
//                 value={assignmentData.closeDate}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//         </>
//       )}

//       {activeTab === 'virtual-adult' && (
//         <div className="form-container">
//           <div className="form-section">
//             <h3 className="section-title">Name of Virtual Adult</h3>
//             <input
//               type="text"
//               name="virtualAdultName"
//               placeholder="Type VA's name here..."
//               value={assignmentData.virtualAdultName}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-section">
//             <h3 className="section-title">AI Model</h3>
//             <select
//               name="aiModel"
//               value={assignmentData.aiModel}
//               onChange={handleChange}
//             >
//               <option value="Chat GPT 4o">Chat GPT 4o</option>
//               <option value="Chat GPT 4o mini">Chat GPT 4o mini</option>
//             </select>
//           </div>

//           <div className="form-section">
//             <h3 className="section-title">Photo of Virtual Adult</h3>
//             <input
//               type="file"
//               name="virtualAdultPhoto"
//               accept="image/jpeg"
//               onChange={handleFileUpload}
//             />
//             <p style={{ color: '#828282' }}>
//               Only .jpeg or .jpg files are accepted
//             </p>
//             {assignmentData.virtualAdultPhoto && (
//               <div className="file-preview">
//                 {assignmentData.virtualAdultPhoto.name} -{' '}
//                 {Math.round(assignmentData.virtualAdultPhoto.size / 1024)} KB
//               </div>
//             )}
//           </div>

//           <div className="form-section">
//             <h3 className="section-title">Upload Scenario</h3>
//             <input
//               type="file"
//               name="scenarioFile"
//               accept=".pdf,.doc,.docx,.txt"
//               onChange={handleFileUpload}
//             />
//             <p style={{ color: '#828282' }}>
//               Only .txt or .pdf files are accepted
//             </p>
//             {assignmentData.scenarioFile && (
//               <div className="file-preview">
//                 {assignmentData.scenarioFile.name} -{' '}
//                 {Math.round(assignmentData.scenarioFile.size / 1024)} KB
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default NewAssignmentPage;
