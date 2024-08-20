import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from 'react-router-dom';
import './App.css';

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

function SearchBar() {
  return (
    <div className="header">
      <div className="header-content">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <div className="search-icon" />
        </div>
        <div className="user-section">
          <div className="notification-icon" />
          <div className="user-avatar" />
        </div>
      </div>
    </div>
  );
}

function Assignments() {
  return (
    <div className="main-content">
      <h2 className="sub-heading">Assignment</h2>
      <table className="assignments-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>No of Students Questions</th>
            <th>Assignment Status</th>
            <th>Release Date</th>
            <th>Close Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Major Depressive Disorder</td>
            <td>10</td>
            <td><span className="status not-started">Not started</span></td>
            <td>23/9/2024</td>
            <td>23/10/2024</td>
          </tr>
          <tr>
            <td>Bipolar Disorder</td>
            <td>10</td>
            <td><span className="status completed">Completed</span></td>
            <td>23/09/2022</td>
            <td>23/10/2022</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main-layout">
          <SearchBar />
          <Routes>
            <Route path="/assignments" element={<Assignments />} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
