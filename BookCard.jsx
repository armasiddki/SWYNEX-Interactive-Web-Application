import React from 'react'

function BookCard({ book, onEdit, onDelete})  {
  return (
  <div className="book-card">
        
          <div className="book-cover">📖</div>
          <div className="book-info">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <span className={`status ${book.status === "Reading" ? "reading" : "completed"}`}>{book.status}</span>
           
           <div className="book-actions"><button className="edit-button" onClick={() => onEdit(book)}>Edit</button>
            <button className="delete-button" onClick={() => onDelete(book.id)}>Delete</button>
          </div>
        </div>
        </div>
  );
}

export default BookCard