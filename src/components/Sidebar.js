import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo-design">Virtual Adults.</div>
      <div className="sidebar-links">
        <Link to="/assignments" className="sidebar-link">
          <div className="sidebar-link-icon">
            {/* Add icon here */}
          </div>
          <div className="sidebar-link-text-white">Assignment</div>
        </Link>
        <Link to="/virtual-adult" className="sidebar-link-inactive">
          <div className="sidebar-link-icon">
            {/* Add icon here */}
          </div>
          <div className="sidebar-link-text-inactive">Virtual Adult</div>
        </Link>
      </div>
      <div className="logout-frame">
        <div className="logout-button">
          <div className="logout-icon">
            {/* Add log out icon here */}
          </div>
          <div className="sidebar-link-text">Log out</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
