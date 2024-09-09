import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../styles/Assignments.css';

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
            <td>
              <Link to="/assignment-detail/major-depressive-disorder">
                Major Depressive Disorder
              </Link>
            </td>
            <td>10</td>
            <td>
              <span className="status not-started">Not started</span>
            </td>
            <td>23/9/2024</td>
            <td>23/10/2024</td>
          </tr>
          <tr>
            <td>
              <Link to="/assignment-detail/bipolar-disorder">
                Bipolar Disorder
              </Link>
            </td>
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
