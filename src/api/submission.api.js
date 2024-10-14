import axios from 'axios';
import { BACKEND_API } from '../config';

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

export { getSubmissions };
