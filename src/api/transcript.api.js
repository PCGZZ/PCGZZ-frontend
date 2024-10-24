import axios from 'axios';
import { BACKEND_API } from '../config';

const getTranscript = async (token, submissionId) => {
  try {
    const res = await axios.get(
      `${BACKEND_API}/submission/transcript?submissionId=${submissionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    if (res.data.ok) {
      return res.data.transcript;
    }
  } catch (error) {
    console.error('Error fetching transcript:', error);
  }
};

const downloadTranscript = async (token, submissionId) => {
  try {
    const res = await axios.get(
      `${BACKEND_API}/submission/transcript/download?submissionId=${submissionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    if (res.data.ok) {
      return res.data.transcript;
    }
  } catch (error) {
    console.error('Error fetching transcript pdf:', error);
  }
};

export { getTranscript, downloadTranscript };
