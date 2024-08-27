import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/sidebar.css';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Face2Icon from '@mui/icons-material/Face2';
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="logo-design">
        <Face2Icon sx={{ mr: 2 }} />
        Virtual Adults.
      </div>
      <div className="sidebar-links">
        <Link
          to="/assignments"
          className={`sidebar-link ${location.pathname === '/assignments' ? 'active' : 'inactive'}`}
        >
          <div className="sidebar-link-icon">
            <AssignmentIcon sx={{ mr: 2 }} />
          </div>
          <div className="sidebar-link-text-white">Assignment</div>
        </Link>
        <Link
          to="/virtual-adult"
          className={`sidebar-link ${location.pathname === '/virtual-adult' ? 'active' : 'inactive'}`}
        >
          <div className="sidebar-link-icon">
            <Face2Icon sx={{ mr: 2 }} />
          </div>
          <div className="sidebar-link-text-white">Virtual Adult</div>
        </Link>
      </div>
      <div
        className="logout-frame"
        role="button"// Adding role for accessibility
        tabIndex={0}// Making it focusable with keyboard
        onClick={handleLogout}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleLogout(); // Trigger logout on Enter or Space key
          }
        }}
      >
        <div className="logout-button">
          <div className="logout-icon">
            <LogoutIcon sx={{ mr: 2, color: 'var(--text)' }} />
          </div>
          <div className="logout-text">Log out</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
