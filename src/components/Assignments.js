import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import fetchAccessToken from './Auth0Authen';
import NewAssignmentPage from './NewAssignmentPage';
import '../styles/assignments.css';
import { BACKEND_API, AUTH0_API_IDENTIFIER, AUTH0_SCOPE } from '../config';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const getStatus = (releaseDate, closeDate) => {
  const now = new Date();
  const release = new Date(releaseDate);
  const close = new Date(closeDate);
  let status = null;

  if (now < release) {
    status = 'not-started';
  } else if (now > close) {
    status = 'completed';
  } else {
    status = 'in-progress';
  }
  return status;
};

function Assignments() {
  const [assignments, setAssignments] = useState(null);
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNewAssignmentForm, setShowNewAssignmentForm] = useState(false);

  const retrieveAsmts = useCallback(async (tok) => {
    try {
      const res = await axios.get(`${BACKEND_API}/assignment/list`, {
        headers: {
          Authorization: `Bearer ${tok}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.data.ok) {
        return res.data.assignments;
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  }, []);

  const getRole = useCallback(async (tok) => {
    const res = await axios.get(`${BACKEND_API}/users/get`, {
      headers: {
        Authorization: `Bearer ${tok}`,
        'Content-Type': 'application/json',
      },
    });

    if (res.data.ok) {
      return res.data.user.role;
    }
    throw new Error('Failed to fetch user role');
  }, []);

  const fetchTokenAndRoleAndAsmts = useCallback(async () => {
    try {
      const token = await fetchAccessToken({
        getAccessTokenSilently,
        getAccessTokenWithPopup,
        AUTH0_API_IDENTIFIER,
        AUTH0_SCOPE,
      });
      console.log('Access Token');

      // call api to get user role and fetch assignment lists
      if (token) {
        const userRole = await getRole(token);
        const asmtList = await retrieveAsmts(token);
        if (userRole) {
          setRole(userRole);
        }
        if (asmtList) {
          setAssignments(asmtList);
        }
      }
    } catch (error) {
      console.error('Error fetching token or assignments:', error);
    } finally {
      setLoading(false); // Set loading to false when the process is complete
    }
  }, [getAccessTokenSilently, getAccessTokenWithPopup, retrieveAsmts, getRole]);

  useEffect(() => {
    fetchTokenAndRoleAndAsmts();
  }, [fetchTokenAndRoleAndAsmts]);

  if (loading) {
    return <div>Loading...</div>; // Render a loading state while fetching data
  }

  const handleAddAssignment = () => {
    setShowNewAssignmentForm(true);
  };

  const handleSaveAssignment = () => {
    setShowNewAssignmentForm(false); // Hide form after saving
  };

  const handleCancelAssignment = () => {
    setShowNewAssignmentForm(false); // Hide form when cancelling
  };

  if (showNewAssignmentForm) {
    // If "New Assignment" is clicked, render the form
    return (
      <NewAssignmentPage
        onSave={handleSaveAssignment}
        onCancel={handleCancelAssignment} // Pass the cancel handler
      />
    );
  }

  return (
    <div className="main-content">
      <h2 className="sub-heading">
        Assignments
        {role === 'educator' || role === 'admin' ? (
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
        ) : null}
      </h2>

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
          {assignments && assignments.length > 0 ? (
            assignments.map((asmt) => (
              <tr key={asmt._id}>
                <td>{asmt.title}</td>
                <td>{asmt.numOfQuestions}</td>
                <td>
                  <span
                    className={`status ${getStatus(asmt.releaseDate, asmt.dueDate)}`}
                  >
                    {getStatus(asmt.releaseDate, asmt.dueDate)}
                  </span>
                </td>
                <td>{formatDate(asmt.releaseDate)}</td>
                <td>{formatDate(asmt.dueDate)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No assignments.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Assignments;
