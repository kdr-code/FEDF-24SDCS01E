import React, { useEffect, useState } from "react";
import BookList from "./modules/bookList";
import Cart from "./components/Cart";
import booksData from "./data/books.json";
import { addToCart, getCart } from "./modules/cartManager";
import "./App.css"
export default function App() {
  const [books, setBooks] = useState([]);
  const [cartItems, setCartItems] = useState(getCart());

  useEffect(() => {
    // Load books from JSON
    setBooks(booksData);
  }, []);

  function handleAdd(book) {
    addToCart(book);
    setCartItems(getCart());
  }

  function handleCartChange(updatedCart) {
    setCartItems(updatedCart);
  }

  return (
    <div className="app">
      <header>
        <h1>Online Bookstore</h1>
        <div className="cart-summary">
          <strong>Cart:</strong> {cartItems.length} item(s)
        </div>
      </header>

      <main>
        <BookList books={books} onAdd={handleAdd} />
        <Cart onChange={handleCartChange} />
      </main>

      <footer>
        <p>Simple demo bookstore — mock checkout only.</p>
      </footer>
    </div>
  );
}
