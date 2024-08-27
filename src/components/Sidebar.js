import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Perform any necessary cleanup or logout actions here
    navigate('/'); // Redirect to the login page
  };

  return (
    <div className="sidebar">
      <div className="logo-design">Virtual Adults.</div>
      <div className="sidebar-links">
        <Link
          to="/assignments"
          className={`sidebar-link ${location.pathname === '/assignments' ? 'active' : 'inactive'}`}
        >
          <div className="sidebar-link-icon">
            {/* Add icon here */}
          </div>
          <div className="sidebar-link-text-white">Assignment</div>
        </Link>
        <Link
          to="/virtual-adult"
          className={`sidebar-link ${location.pathname === '/virtual-adult' ? 'active' : 'inactive'}`}
        >
          <div className="sidebar-link-icon">
            {/* Add icon here */}
          </div>
          <div className="sidebar-link-text-white">Virtual Adult</div>
        </Link>
      </div>
      <div
        className="logout-frame"
        onClick={handleLogout}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleLogout();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div className="logout-button">
          <div className="logout-icon">
            {/* Add log out icon here */}
          </div>
          <div className="logout-text">Log out</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
