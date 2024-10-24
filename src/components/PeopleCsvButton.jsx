/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useAuth0 } from '@auth0/auth0-react';
import { uploadCSV } from '../api/user.api';

function CsvUploadButton({ op }) {
  const [file, setFile] = useState('');
  const { getAccessTokenSilently } = useAuth0();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadCsv = async () => {
    if (!file) {
      alert('Please upload a CSV file first!');
      return;
    }
    const token = await getAccessTokenSilently();

    const formData = new FormData();
    formData.append('csv', file);
    try {
      const response = await uploadCSV(token, formData);

      if (response.ok) {
        enqueueSnackbar('File uploaded successfully!', {
          autoHideDuration: 5000,
          variant: 'success',
        });
        op();
      } else {
        enqueueSnackbar('Failed to uploaded file:', {
          autoHideDuration: 5000,
          variant: 'error',
        });
      }
    } catch (error) {
      enqueueSnackbar(`Error uploading file: ${error}`, {
        autoHideDuration: 5000,
        variant: 'error',
      });
    }
  };

  return (
    <div>
      <input
        accept=".csv"
        style={{ display: 'none' }}
        id="csv-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="csv-upload">
        <Button variant="contained" component="span" color="primary">
          Upload CSV
        </Button>
      </label>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleUploadCsv}
        disabled={!file}
        style={{ marginLeft: '10px' }}
      >
        Submit to Backend
      </Button>
    </div>
  );
}

export default CsvUploadButton;
