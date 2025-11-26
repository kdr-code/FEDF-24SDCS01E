import React from "react";
import { currencySymbol, formatPrice } from "../modules/uiUtils";

export default function BookCard({ book, onAdd }) {
  const disabled = book.availability !== "in stock";
  return (
    <article className="book-card">
      <h3>{book.title}</h3>
      <p className="author">by {book.author}</p>
      <p className="price">
        {currencySymbol()} {formatPrice(book.price)}
      </p>
      <p className={`availability ${disabled ? "out" : "in"}`}>
        {book.availability}
      </p>
      <button onClick={onAdd} disabled={disabled} className="add-btn">
        {disabled ? "Unavailable" : "Add to Cart"}
      </button>
    </article>
  );
}
