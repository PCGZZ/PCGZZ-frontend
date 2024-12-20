import axios from 'axios';
import { BACKEND_API } from '../config';

async function getAllUsers(token) {
  try {
    const res = await axios.get(`${BACKEND_API}/users/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (res.data.ok) {
      return { ok: true, users: res.data.users };
    }
  } catch (error) {
    console.error('Error fetching Students:', error);
    return { ok: false, error };
  }
}

async function updateUser(token, updatedUser) {
  try {
    const res = await axios.put(`${BACKEND_API}/users/`, updatedUser, {
      params: {
        id: updatedUser._id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (res.data.ok) {
      return { ok: true, user: res.data.user };
    }
  } catch (error) {
    console.error('Error fetching Students:', error);
    return { ok: false, error };
  }
}

async function getUserRole(tok) {
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
}

async function deleteUser(token, id) {
  try {
    const res = await axios.delete(`${BACKEND_API}/users/`, {
      params: {
        id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (res.data.ok) {
      return { ok: true };
    }
  } catch (error) {
    console.error('Error deleting Students:', error);
    return { ok: false, error };
  }
}

async function uploadCSV(token, file) {
  try {
    const res = await axios.post(`${BACKEND_API}/users/csv`, file, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    if (res.data.ok) {
      return { ok: true };
    }
  } catch (error) {
    console.error('Error Uploading Students:', error);
    return { ok: false, error };
  }
}

export { getAllUsers, updateUser, getUserRole, deleteUser, uploadCSV };
