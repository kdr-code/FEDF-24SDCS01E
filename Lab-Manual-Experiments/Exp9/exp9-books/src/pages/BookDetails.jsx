import { useParams, Link } from "react-router-dom";
import books from "../booksData.js";

function BookDetails() {
  const { id } = useParams();
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="not-found">
        <h2>Book not found</h2>
        <p>No book with id {id} exists.</p>
        <Link to="/books">Back to Books</Link>
      </div>
    );
  }

  return (
    <section>
      <div className="details">
        <h1>{book.title}</h1>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Price:</strong> ₹{book.price}</p>
        <p><strong>Description:</strong> {book.description}</p>
        <p style={{ marginTop: "12px" }}>
          <Link to="/books">Back to all books</Link>
        </p>
      </div>
    </section>
  );
}

export default BookDetails;
