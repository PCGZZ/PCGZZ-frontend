import React from 'react';

function FileDownload({ base64Data, fileType, fileName }) {
  const styles = {
    download_button: {
      backgroundColor: 'rgba(98, 91, 113, 0.1)',
      color: 'var(--text)',
      font: 'bold',
      padding: '10px 20px',
      border: '0.7px solid grey',
      fontSize: 'medium',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    download_button_hover: {
      backgroundColor: 'rgba(130, 130, 130, 0.8)',
      color: 'var(--white)',
    },
  };

  const [hover, setHover] = React.useState(false);

  const base64ToBlob = (base64, contentType) => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    return new Blob(byteArrays, { type: contentType });
  };

  const handleDownload = () => {
    if (!base64Data) {
      console.error('No base64 data provided.');
      return;
    }

    const base64String = `data:${fileType};base64,${base64Data}`;
    const blob = base64ToBlob(base64String, fileType);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button
        type="button"
        style={
          hover
            ? { ...styles.download_button, ...styles.download_button_hover }
            : styles.download_button
        }
        onClick={handleDownload}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Download {fileName}
      </button>
    </div>
  );
}

export default FileDownload;
