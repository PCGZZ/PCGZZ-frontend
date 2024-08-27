import React from 'react';
import '../styles/assignments.css';

function Assignments() {
  return (
    <div className="main-content">
      <h2 className="sub-heading">Assignment</h2>
      <table className="assignments-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>No of Students Questions</th>
            <th>Assignment Status</th>
            <th>Release Date</th>
            <th>Close Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Major Depressive Disorder</td>
            <td>10</td>
            <td>
              <span className="status not-started">Not started</span>
            </td>
            <td>23/9/2024</td>
            <td>23/10/2024</td>
          </tr>
          <tr>
            <td>Bipolar Disorder</td>
            <td>10</td>
            <td>
              <span className="status completed">Completed</span>
            </td>
            <td>23/09/2022</td>
            <td>23/10/2022</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Assignments;
