import React from "react";
import BookCard from "../components/BookCard";

// BookList receives books and onAdd callback
export default function BookList({ books, onAdd }) {
  return (
    <section className="book-list">
      <h2>Available Books</h2>
      <div className="books-grid">
        {books.map((b) => (
          <BookCard key={b.id} book={b} onAdd={() => onAdd(b)} />
        ))}
      </div>
    </section>
  );
}
