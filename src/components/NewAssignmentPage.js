import React, { useState } from 'react';
import '../styles/NewAssignment.css'; // Make sure to create the corresponding CSS file
import { useNavigate } from 'react-router-dom'; // For navigating to different routes

function NewAssignmentPage() {
  const navigate = useNavigate();

  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    questions: '',
    releaseDate: '',
    closeDate: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignmentData({ ...assignmentData, [name]: value });
  };

  // Handle save (you can later add API calls to submit this data)
  const handleSave = () => {
    // eslint-disable-next-line no-console
    console.log('Assignment Saved:', assignmentData);
    // Navigate back to the main assignments page after saving
    navigate('/teacher-assignments');
  };

  // Handle cancel (navigate back without saving)
  const handleCancel = () => {
    navigate('/teacher-assignments');
  };

  return (
    <div className="main-content">
      <h2 className="sub-heading">New Assignment</h2>

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

        <div className="date-container">
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

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="cancel-button" type="button" onClick={handleCancel}>
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
