import React from 'react';

function FileDownload({ base64Data, fileType, fileName }) {
  // Function to convert base64 to Blob
  const base64ToBlob = (base64, contentType) => {
    const byteCharacters = atob(base64.split(',')[1]); // 解码 base64
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  // Create the Blob and generate a download link
  const handleDownload = () => {
    if (!base64Data) {
      console.error('No base64 data provided.');
      return;
    }

    const base64String = `data:${fileType};base64,${base64Data}`;
    const blob = base64ToBlob(base64String, fileType);
    const url = URL.createObjectURL(blob);

    // Create an <a> tag for download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // Set the downloaded file name
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button type="button" onClick={handleDownload}>
        Download {fileName}
      </button>
    </div>
  );
}

export default FileDownload;
