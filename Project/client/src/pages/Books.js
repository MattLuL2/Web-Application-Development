import React from 'react';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import '../styles/BookList.css';

function Books() {
  return (
    <div className="books-page">
      <h2>Books</h2>
      <BookForm />
      <BookList />
    </div>
  );
}

export default Books;
