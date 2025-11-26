import { Link } from "react-router-dom";
import books from "../booksData.js";

function Books() {
  return (
    <section>
      <h1>Books</h1>
      <div className="book-list">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Price: ₹{book.price}</p>
            <Link to={`/books/${book.id}`}>View details</Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Books;
