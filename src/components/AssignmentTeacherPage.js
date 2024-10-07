// src/components/AssignmentTeacherPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import NewAssignmentPage from './NewAssignmentPage'; // Import the NewAssignmentPage
import { AssignmentsContext } from '../context/AssignmentsContext';
import '../styles/AssignmentTeacherPage.css';

function AssignmentTeacherPage() {
  const { assignments, deleteAssignment, updateAssignment } =
    useContext(AssignmentsContext);

  const [showNewAssignmentForm, setShowNewAssignmentForm] = useState(false);
  const navigate = useNavigate();

  const handleAddAssignment = () => {
    setShowNewAssignmentForm(true);
  };

  const handleSaveAssignment = () => {
    setShowNewAssignmentForm(false); // Hide form after saving
  };

  if (showNewAssignmentForm) {
    // If "New Assignment" is clicked, render the form
    return (
      <>
        <SearchBar />
        <Sidebar />
        <div className="main-content">
          <NewAssignmentPage onSave={handleSaveAssignment} />
        </div>
      </>
    );
  }

  // Otherwise, render the assignment table
  return (
    <>
      <SearchBar />
      <Sidebar />
      <div className="main-content">
        <h2 className="sub-heading">Assignments</h2>

        <div className="assignment-actions">
          <button className="edit-button" type="button">
            Edit
          </button>
          <button
            className="new-assignment-button"
            type="button"
            onClick={handleAddAssignment}
          >
            New Assignment +
          </button>
        </div>

        <table className="assignments-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>No of Students Questions</th>
              <th>Assignment Status</th>
              <th>Release Date</th>
              <th>Close Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>
                  <button
                    className="title-button"
                    type="button"
                    onClick={() =>
                      navigate(`/assignment-detail/${assignment.id}`)
                    }
                  >
                    {assignment.title}
                  </button>
                </td>
                <td>{assignment.studentQuestions}</td>
                <td>{assignment.status}</td>
                <td>{assignment.releaseDate}</td>
                <td>{assignment.closeDate}</td>
                <td>
                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => deleteAssignment(assignment.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AssignmentTeacherPage;
