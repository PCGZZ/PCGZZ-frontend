import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/sidebar.css';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Face2Icon from '@mui/icons-material/Face2';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function Sidebar() {
  const location = useLocation();
  const { logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin, // Redirect to the deployment path
      },
    });
  };

  return (
    isAuthenticated && (
      <div className="sidebar">
        <div className="logo-design">
          <Face2Icon sx={{ mr: 2 }} />
          Virtual Adult
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

          <Link
            to="/user-list"
            className={`sidebar-link ${location.pathname === '/user-list' ? 'active' : 'inactive'}`}
          >
            <div className="sidebar-link-icon">
              <PeopleAltIcon sx={{ mr: 2 }} />
            </div>
            <div className="sidebar-link-text-white">Students</div>
          </Link>
        </div>
        {/* Login & Logout */}
        <div className="logout-frame">
          <div className="logout-button">
            <button className="lo-button" onClick={handleLogout} type="button">
              <div className="logout-icon">
                <LogoutIcon sx={{ mr: 2, color: 'var(--text)' }} />
              </div>
              <div className="logout-text">Log out</div>
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Sidebar;
