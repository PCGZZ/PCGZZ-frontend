import React, { useState, useEffect, useCallback } from 'react';
import { Buffer } from 'buffer';
import { useAuth0 } from '@auth0/auth0-react';
import { AUTH0_API_IDENTIFIER, AUTH0_SCOPE } from '../config';
import fetchAccessToken from '../api/Authen';
import { getTranscript, downloadTranscript } from '../api/transcript.api';
import FileDownload from '../api/FileDownload';

function TranscriptModal({ isOpen, onClose, submission }) {
  const [transcript, setTranscript] = useState([]);
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const [pdf, setPdf] = useState();

  const styles = {
    transcriptContent: {
      maxHeight: '400px', // 设置最大高度
      overflowY: 'auto', // 垂直方向滚动
      padding: '15px', // 内边距
      border: '1px solid #ddd', // 边框
      borderRadius: '5px', // 圆角边框
      backgroundColor: '#f9f9f9', // 背景颜色
      marginTop: '20px', // 上边距
    },
    message: {
      margin: '10px 0', // 消息间距
      padding: '8px', // 内边距
      backgroundColor: '#fff', // 消息背景颜色
      borderRadius: '4px', // 圆角
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', // 阴影
    },
    sender: {
      color: '#333', // 发件人颜色
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
        await fetchTokenAndTranscript();
      }
    };
    func();
  }, [isOpen, submission, fetchTokenAndTranscript]);

  if (!isOpen || !submission) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{submission.name} Transcript Preview</h2>
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
        <button type="button" onClick={onClose}>
          Close
        </button>
        {pdf && (
          <FileDownload
            base64Data={pdf.data}
            fileType={pdf.contentType}
            fileName={pdf.filename}
          />
        )}
      </div>
    </div>
  );
}

export default TranscriptModal;
