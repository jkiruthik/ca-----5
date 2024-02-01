// Header.js
import React from 'react';

const Header = ({ registered, searchTerm, handleSearch }) => {
  return (
    <header>
      <h1 className='heading'>Kalvium Books</h1>
      {registered ? (
        <input
          className='search_bar'
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={handleSearch}
        />
      ) : null}
    </header>
  );
}

export default Header;
