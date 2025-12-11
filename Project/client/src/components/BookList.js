import React, { useEffect, useState } from 'react';
import '../styles/BookList.css';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(() => setBooks([]));
  }, []);

  return (
    <div className="book-list">
      <h3>Book List</h3>
      <ul>
        {books.length === 0 ? (
          <li>No books found.</li>
        ) : (
          books.map(book => (
            <li key={book._id}>
              <strong>{book.title}</strong> by {book.author}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default BookList;
