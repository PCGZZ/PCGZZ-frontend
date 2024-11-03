import React from 'react';
import Sidebar from '../components/Sidebar';
import Assignments from '../components/Assignments';
import '../styles/App.css';

function AssignmentsPage() {
  return (
    <>
      <Sidebar />
      <div className="main-layout">
        <Assignments />
      </div>
    </>
  );
}

export default AssignmentsPage;
