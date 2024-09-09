import React from 'react';
import '../styles/Assignments.css'; // Fix the casing here

function AssignmentTeacherPage() {
  return (
    <div className="main-content">
      <h2 className="sub-heading">Teacher Assignments</h2>
      <table className="assignments-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Number of Student Questions</th>
            <th>Assignment Status</th>
            <th>Release Date</th>
            <th>Close Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bipolar Disorder</td>
            <td>10</td>
            <td>
              <span className="status completed">Completed</span>
            </td>
            <td>23/09/2024</td>
            <td>23/10/2024</td>
          </tr>
          {/* Add more assignment rows as necessary */}
        </tbody>
      </table>
    </div>
  );
}

export default AssignmentTeacherPage;
