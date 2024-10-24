/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Button } from '@mui/material';

function CsvUploadButton() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadCsv = async () => {
    if (!file) {
      alert('Please upload a CSV file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-csv', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully!');
      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
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
        onClick={uploadCsv}
        style={{ marginLeft: '10px' }}
      >
        Submit to Backend
      </Button>
    </div>
  );
}

export default CsvUploadButton;
