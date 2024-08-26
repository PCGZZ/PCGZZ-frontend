import React from 'react';
import '../styles/searchbar.css';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

function SearchBar() {
  return (
    <Box className="header">
      <Box className="header-content">
        <Box className="search-bar">
          <input type="text" placeholder="Search" />
          <SearchIcon className="search-icon" />
        </Box>
        <Box className="user-section">
          <Box className="notification-icon" />
          <Box className="user-avatar" />
        </Box>
      </Box>
    </Box>
  );
}

export default SearchBar;
