import axios from 'axios';
import { BACKEND_API } from '../config';

const createSubmission = async (token, asmtId) => {
  try {
    const res = await axios.post(
      `${BACKEND_API}/submission`,
      {
        assignmentId: asmtId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    if (res.data.ok) {
      console.log('submission:', res.data.ok);
      return res.data.submission;
    }
  } catch (error) {
    console.error('Error creating submission:', error);
  }
};

const getSubmissions = async (
  token,
  params = { assignmentId: '67049da4b7ae40607de91239' },
) => {
  try {
    const res = await axios.get(
      `${BACKEND_API}/submission?assignmentId=${params.assignmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    if (res.data.ok) {
      console.log('submission:', res.data.submission);
      return res.data.submission;
    }
  } catch (error) {
    console.error('Error fetching submission:', error);
  }
};

export { getSubmissions, createSubmission };
