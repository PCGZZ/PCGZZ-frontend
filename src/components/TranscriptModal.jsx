import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Buffer } from 'buffer';
import '../styles/assignments.css';
import { useAuth0 } from '@auth0/auth0-react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { AUTH0_API_IDENTIFIER, AUTH0_SCOPE } from '../config';
import fetchAccessToken from '../api/Authen';
import { getTranscript, downloadTranscript } from '../api/transcript.api';
import FileDownload from '../api/FileDownload';

function TranscriptModal({ isOpen, onClose, submission }) {
  const [transcript, setTranscript] = useState([]);
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const [pdf, setPdf] = useState();
  const dialogRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const styles = {
    dialog: {
      width: '60%',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff',
      border: 'none',
      margin: 'auto auto',
    },
    transcriptContent: {
      maxHeight: '400px',
      overflowY: 'auto',
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
      marginTop: '20px',
      marginBottom: '20px',
    },
    closeIcon: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      cursor: 'pointer',
    },
    message: {
      margin: '10px 0',
      padding: '8px',
      backgroundColor: '#fff',
      borderRadius: '4px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    sender: {
      color: '#333',
    },
  };

  const fetchTokenAndTranscript = useCallback(async () => {
    try {
      const token = await fetchAccessToken({
        getAccessTokenSilently,
        getAccessTokenWithPopup,
        AUTH0_API_IDENTIFIER,
        AUTH0_SCOPE,
      });

      if (token) {
        console.log('Access Token');
        const trans = await getTranscript(token, submission.id);
        const pdfData = await downloadTranscript(token, submission.id);
        if (trans) {
          setTranscript(trans);
        }
        if (pdfData) {
          const data = {
            data: Buffer.from(pdfData.data).toString('base64'),
            contentType: 'application/pdf',
            filename: `${submission.name}-transcript.pdf`,
          };
          setPdf(data);
        }
      }
    } catch (error) {
      console.error('Error fetching transcript:', error);
    }
  }, [getAccessTokenSilently, getAccessTokenWithPopup, submission]);

  useEffect(() => {
    const func = async () => {
      if (isOpen && submission) {
        dialogRef.current?.showModal();
        await setLoading(true);
        await fetchTokenAndTranscript();
        await setLoading(false);
      } else {
        dialogRef.current?.close();
      }
    };
    func();
  }, [isOpen, submission, fetchTokenAndTranscript]);

  if (!submission) return null;

  if (loading) {
    return (
      <dialog ref={dialogRef} style={styles.dialog}>
        <h2 className="sub-heading">Loading Transcript...</h2>
      </dialog>
    );
  }

  return (
    <dialog ref={dialogRef} style={styles.dialog}>
      <h2 className="sub-heading">
        {submission.name} Transcript Preview
        <div className="assignment-actions">
          <IconButton
            style={styles.closeIcon}
            color="rgba(96, 209, 196, 1)"
            onClick={() => dialogRef.current.close()}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </h2>
      <div style={styles.transcriptContent}>
        {!loading && transcript.length > 0
          ? transcript.map((message) => (
              <p key={`${message.role}-${message.content}-${Math.random()}`}>
                <strong>{message.role}:</strong> {message.content}
              </p>
            ))
          : !loading && <p>No transcript available.</p>}
      </div>
      {pdf && (
        <FileDownload
          base64Data={pdf.data}
          fileType={pdf.contentType}
          fileName={pdf.filename}
        />
      )}
    </dialog>
  );
}

export default TranscriptModal;
