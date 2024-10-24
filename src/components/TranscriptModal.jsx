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
  const dialogRef = useRef(null); // 引用 <dialog> 元素

  const styles = {
    transcriptContent: {
      maxHeight: '400px',
      overflowY: 'auto',
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
      marginTop: '20px',
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
        dialogRef.current?.showModal(); // 显示 <dialog>
        await fetchTokenAndTranscript();
      } else {
        dialogRef.current?.close(); // 关闭 <dialog>
      }
    };
    func();
  }, [isOpen, submission, fetchTokenAndTranscript]);

  if (!submission) return null;

  return (
    <dialog ref={dialogRef}>
      <h2 className="sub-heading">
        {submission.name} Transcript Preview
        <div className="assignment-actions">
          <IconButton color="rgba(96, 209, 196, 1)">
            <CloseIcon onClick={() => dialogRef.current.close()} />
          </IconButton>
        </div>
      </h2>
      <div style={styles.transcriptContent}>
        {transcript.length > 0 ? (
          transcript.map((message) => (
            <p key={`${message.role}-${message.content}-${Math.random()}`}>
              <strong>{message.role}:</strong> {message.content}
            </p>
          ))
        ) : (
          <p>No transcript available.</p>
        )}
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
