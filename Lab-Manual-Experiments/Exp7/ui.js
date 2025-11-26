import { books } from "./books.js";
import { addToCart, removeFromCart, getCartItems, getCartTotal } from "./cart.js";

const bookListDiv = document.getElementById("bookList");
const cartItemsDiv = document.getElementById("cartItems");
const cartTotalDiv = document.getElementById("cartTotal");

// Render books
function renderBooks() {
  bookListDiv.innerHTML = "";

  books.forEach(book => {
    const div = document.createElement("div");
    div.className = "book";

    div.innerHTML = `
      <div class="book-title">${book.title}</div>
      <div>Author: ${book.author}</div>
      <div>Price: ₹${book.price}</div>
      <div>Status: ${
        book.availability === "in stock"
          ? "In stock"
          : `<span class="out">Out of stock</span>`
      }</div>
    `;

    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";
    btn.disabled = book.availability !== "in stock";

    btn.addEventListener("click", () => {
      addToCart(book);
      renderCart();
    });

    div.appendChild(btn);
    bookListDiv.appendChild(div);
  });
}

// Render cart
function renderCart() {
  const items = getCartItems();
  cartItemsDiv.innerHTML = "";

  if (items.length === 0) {
    cartItemsDiv.textContent = "Cart is empty.";
    cartTotalDiv.textContent = "Total: ₹0";
    return;
  }

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div>${item.title} (x${item.quantity}) - ₹${item.price * item.quantity}</div>
    `;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      removeFromCart(item.id);
      renderCart();
    });

    div.appendChild(removeBtn);
    cartItemsDiv.appendChild(div);
  });

  const total = getCartTotal();
  cartTotalDiv.textContent = `Total: ₹${total}`;
}

// Init
renderBooks();
renderCart();
