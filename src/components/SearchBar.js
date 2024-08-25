import React from 'react';
import '../styles/searchbar.css';

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

export default SearchBar;
