// BookList.js
import React from 'react';

const BookList = ({ books, filteredBooks }) => {
  return (
    <div className="book_list">
      {filteredBooks.map(book => (
        <div key={book.id} className="book">
          <img src={book.imageLinks.thumbnail} alt={book.title} />
          <div>
            <h2>{book.title}</h2>
            <p>{book.authors.join(', ')}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
