import React, { useState } from 'react';
import '../styles/BookList.css';

function BookForm() {
  const [form, setForm] = useState({ title: '', author: '', isbn: '', description: '', publishedDate: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    // TODO: Replace with actual API call
    try {
      const res = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setMessage('Book added!');
        setForm({ title: '', author: '', isbn: '', description: '', publishedDate: '' });
      } else {
        setMessage('Failed to add book');
      }
    } catch {
      setMessage('Error adding book');
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="author" type="text" placeholder="Author" value={form.author} onChange={handleChange} required />
      <input name="isbn" type="text" placeholder="ISBN" value={form.isbn} onChange={handleChange} />
      <input name="description" type="text" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="publishedDate" type="date" placeholder="Published Date" value={form.publishedDate} onChange={handleChange} />
      <button type="submit" className="btn">Add Book</button>
      {message && <div className="message">{message}</div>}
    </form>
  );
}

export default BookForm;
