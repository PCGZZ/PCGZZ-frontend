import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import fetchAccessToken from './Auth0Authen';
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
  const test = 'http://localhost:3001';
  const [assignments, setAssignments] = useState(null);
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  const retrieveAsmts = useCallback(async (tok) => {
    try {
      const res = await axios.get(`${BACKEND_API}/assignment/list`, {
        headers: {
          Authorization: `Bearer ${tok}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.data.ok) {
        console.log('asmts:', res.data.assignments);
        return res.data.assignments;
      }
      console.log('message:', res.data.message);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  }, []);

  const fetchTokenAndAsmts = useCallback(async () => {
    // get access token from auth0
    try {
      const token = await fetchAccessToken({
        getAccessTokenSilently,
        getAccessTokenWithPopup,
        AUTH0_API_IDENTIFIER,
        AUTH0_SCOPE,
      });
      console.log('Access Token:', token);

      // call api to fetch assignment lists
      if (token) {
        const asmtList = await retrieveAsmts(token);
        if (asmtList) {
          setAssignments(asmtList);
        }
      }
    } catch (error) {
      console.error('Error fetching token or assignments:', error);
    }
  }, [getAccessTokenSilently, getAccessTokenWithPopup, retrieveAsmts]);

  useEffect(() => {
    fetchTokenAndAsmts();
  }, [fetchTokenAndAsmts]);

  return (
    <div className="main-content">
      <h2 className="sub-heading">Assignments</h2>
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
            <tr colSpan="5">You Have No assignments!</tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Assignments;
