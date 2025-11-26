// Simple cart manager module using ES6 exports. Not a React hook — a plain JS module
const STORAGE_KEY = "bookstore_cart_v1";
let cart = loadFromStorage();

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to load cart from storage", e);
    return [];
  }
}

function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error("Failed to save cart to storage", e);
  }
}

export function getCart() {
  // return shallow copy
  return [...cart];
}

export function clearCart() {
  cart = [];
  saveToStorage();
}

export function addToCart(book) {
  // If book already in cart, increase quantity
  const existing = cart.find((b) => b.id === book.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...book, qty: 1 });
  }
  saveToStorage();
}

export function removeFromCart(bookId) {
  const idx = cart.findIndex((b) => b.id === bookId);
  if (idx > -1) {
    cart.splice(idx, 1);
    saveToStorage();
    return true;
  }
  return false;
}

export function updateQuantity(bookId, qty) {
  const item = cart.find((b) => b.id === bookId);
  if (!item) return false;
  if (qty <= 0) {
    removeFromCart(bookId);
  } else {
    item.qty = qty;
    saveToStorage();
  }
  return true;
}

export function cartTotal() {
  return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
}
