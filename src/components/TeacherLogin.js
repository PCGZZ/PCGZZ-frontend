import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TeacherLogin.css'; // Ensure this file exists
import deakinLogo from '../styles/image/deakin-university.png'; // Adjust the path if needed

function TeacherLogin() {
  const navigate = useNavigate(); // Hook for navigation

  const handleTeacherLogin = () => {
    // Navigate to the teacher assignments page directly
    navigate('/teacher-assignments');
  };

  return (
    <div className="teacher-login-container">
      <div className="teacher-login-left">
        <img
          src={deakinLogo}
          alt="Deakin University Logo"
          className="deakin-logo"
        />
        <h1>Teacher Portal</h1>
        <button
          className="teacher-login-button"
          onClick={handleTeacherLogin} // When clicked, navigate to the teacher assignments page
          type="button"
        >
          Teacher Log in
        </button>
      </div>
      <div className="teacher-login-right">
        <div className="teacher-login-message">
          Access your teacher dashboard now!
        </div>
        <div className="teacher-image" />
      </div>
    </div>
  );
}

export default TeacherLogin;
