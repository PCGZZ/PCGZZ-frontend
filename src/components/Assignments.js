import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAssignments, setSelectedAssignments] = useState([]);
  const navigate = useNavigate();

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
      setLoading(true);
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
      setLoading(false);
    }
  }, [getAccessTokenSilently, getAccessTokenWithPopup, retrieveAsmts, getRole]);

  useEffect(() => {
    const func = async () => {
      await fetchTokenAndRoleAndAsmts();
    };

    func();
  }, [fetchTokenAndRoleAndAsmts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddAssignment = () => {
    setShowNewAssignmentForm(true);
  };

  const handleSaveAssignment = async () => {
    setShowNewAssignmentForm(false);

    try {
      await fetchTokenAndRoleAndAsmts();
    } catch (error) {
      console.error('Error fetching assignments after saving:', error);
    }
  };

  const handleCancelAssignment = () => {
    setShowNewAssignmentForm(false);
  };

  const handleEdit = () => {
    setIsEditing((prev) => !prev); // Toggle edit mode
    setSelectedAssignments([]); // Reset selected assignments when entering/exiting edit mode
  };

  const handleSelectAssignment = (id, virtualAdult) => {
    setSelectedAssignments((prev) => {
      const isSelected = prev.some(
        (selected) =>
          selected._id === id && selected.virtualAdult === virtualAdult,
      );

      if (isSelected) {
        return prev.filter(
          (selected) =>
            !(selected._id === id && selected.virtualAdult === virtualAdult),
        );
      }
      return [...prev, { _id: id, virtualAdult }];
    });
  };

  const deleteVA = async (tok, asmtLi) => {
    try {
      await Promise.all(
        asmtLi.map(async (asmt) => {
          const vaId = asmt.virtualAdult;
          const res = await axios.delete(`${BACKEND_API}/va?id=${vaId}`, {
            headers: {
              Authorization: `Bearer ${tok}`,
              'Content-Type': 'application/json',
            },
          });
          if (!res.data.ok) {
            throw new Error(`Failed to delete virtual adult with ID: ${vaId}`);
          }
        }),
      );
      console.log('All virtual adults deleted successfully.');
    } catch (error) {
      console.error('Error deleting virtual adults:', error.message);
      throw error;
    }
  };

  const deleteAsmt = async (tok, asmtLi) => {
    try {
      await Promise.all(
        asmtLi.map(async (asmt) => {
          const id = asmt._id;
          const res = await axios.delete(`${BACKEND_API}/assignment?id=${id}`, {
            headers: {
              Authorization: `Bearer ${tok}`,
              'Content-Type': 'application/json',
            },
          });
          if (!res.data.ok) {
            throw new Error(`Failed to delete assignment with ID: ${id}`);
          }
        }),
      );
      console.log('All assignments deleted successfully.');
    } catch (error) {
      console.error('Error deleting assignments:', error.message);
      throw error;
    }
  };

  const deleteAsmtAndVA = async (asmtLi) => {
    try {
      setLoading(true);
      const token = await fetchAccessToken({
        getAccessTokenSilently,
        getAccessTokenWithPopup,
        AUTH0_API_IDENTIFIER,
        AUTH0_SCOPE,
      });
      console.log('Access Token');

      // call api to get user role and fetch assignment lists
      if (token) {
        await deleteVA(token, asmtLi);
        await deleteAsmt(token, asmtLi);
      }
    } catch (error) {
      console.error('Error fetch token or delete assignments:', error);
    }
  };

  const handleDeleteAssignments = async () => {
    if (
      window.confirm('Are you sure you want to delete selected assignment?')
    ) {
      try {
        await deleteAsmtAndVA(selectedAssignments);
        await fetchTokenAndRoleAndAsmts();
        setSelectedAssignments([]);
      } catch (error) {
        console.error('Error deleting assignments:', error);
      }
    }
  };

  if (showNewAssignmentForm) {
    return (
      <NewAssignmentPage
        onSave={handleSaveAssignment}
        onCancel={handleCancelAssignment}
      />
    );
  }

  return (
    <div className="main-content">
      <h2 className="sub-heading">
        Assignments
        {role === 'educator' || role === 'admin' ? (
          <div className="assignment-actions">
            {isEditing && (
              <button
                className="delete-button"
                type="button"
                onClick={handleDeleteAssignments}
                disabled={selectedAssignments.length === 0}
              >
                Delete Selected
              </button>
            )}
            <button className="edit-button" type="button" onClick={handleEdit}>
              {isEditing ? 'Cancel Edit' : 'Edit'}
            </button>
            {!isEditing && (
              <button
                className="new-assignment-button"
                type="button"
                onClick={handleAddAssignment}
              >
                New Assignment +
              </button>
            )}
          </div>
        ) : null}
      </h2>

      <table className="assignments-table">
        <thead>
          <tr>
            {isEditing && <th>Select</th>}
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
                {isEditing && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedAssignments.some(
                        (selected) =>
                          selected._id === asmt._id &&
                          selected.virtualAdult === asmt.virtualAdult,
                      )}
                      onChange={() =>
                        handleSelectAssignment(asmt._id, asmt.virtualAdult)
                      }
                    />
                  </td>
                )}
                <td>
                  <button
                    className="asmt-button"
                    type="button"
                    onClick={() => navigate(`/assignment-detail/${asmt._id}`)}
                  >
                    {asmt.title}
                  </button>
                </td>
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
              <td colSpan={isEditing ? 6 : 5}>No assignments.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Assignments;
