import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar component
import SearchBar from './SearchBar'; // Import SearchBar component
import '../styles/AssignmentTeacherPage.css'; // Import the separate CSS for the teacher's page

function AssignmentTeacherPage() {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Major Depressive Disorder',
      studentQuestions: 10,
      status: 'Not started',
      releaseDate: '23/9/2024',
      closeDate: '23/10/2024',
    },
    {
      id: 2,
      title: 'Generalized Anxiety Disorder',
      studentQuestions: 10,
      status: 'In progress',
      releaseDate: '23/7/2024',
      closeDate: '23/8/2024',
    },
    {
      id: 3,
      title: 'Schizophrenia',
      studentQuestions: 10,
      status: 'Completed',
      releaseDate: '23/9/2023',
      closeDate: '23/10/2023',
    },
    {
      id: 4,
      title: 'Bipolar Disorder',
      studentQuestions: 10,
      status: 'Completed',
      releaseDate: '23/9/2022',
      closeDate: '23/10/2022',
    },
  ]);

  // Function to handle editing assignment fields
  const handleEditAssignment = (index, field, value) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[index][field] = value;
    setAssignments(updatedAssignments);
  };

  // Function to handle adding a new assignment
  const handleAddAssignment = () => {
    const newAssignment = {
      id: assignments.length + 1,
      title: 'New Assignment',
      studentQuestions: 10,
      status: 'Not started',
      releaseDate: '01/01/2025',
      closeDate: '01/02/2025',
    };
    setAssignments([...assignments, newAssignment]);
  };

  // Function to handle deleting an assignment
  const handleDeleteAssignment = (index) => {
    const updatedAssignments = assignments.filter((_, i) => i !== index);
    setAssignments(updatedAssignments);
  };

  return (
    <>
      {/* Add the search bar */}
      <SearchBar />
      {/* Add the sidebar */}
      <Sidebar />
      <div className="main-content">
        <h2 className="sub-heading">Assignments</h2>

        {/* Edit and New Assignment Buttons */}
        <div className="assignment-actions">
          <button className="edit-button" type="button">
            Edit
          </button>
          <button
            className="new-assignment-button"
            onClick={handleAddAssignment}
            type="button"
          >
            New Assignment +
          </button>
        </div>

        {/* Assignments Table */}
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
            {assignments.map((assignment, index) => (
              <tr key={assignment.id}>
                <td>
                  <input
                    type="text"
                    value={assignment.title}
                    onChange={(e) =>
                      handleEditAssignment(index, 'title', e.target.value)
                    }
                  />
                </td>
                <td>{assignment.studentQuestions}</td>
                <td>
                  <select
                    value={assignment.status}
                    onChange={(e) =>
                      handleEditAssignment(index, 'status', e.target.value)
                    }
                  >
                    <option value="Not started">Not started</option>
                    <option value="In progress">In progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    value={assignment.releaseDate}
                    onChange={(e) =>
                      handleEditAssignment(index, 'releaseDate', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={assignment.closeDate}
                    onChange={(e) =>
                      handleEditAssignment(index, 'closeDate', e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteAssignment(index)}
                    type="button"
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
