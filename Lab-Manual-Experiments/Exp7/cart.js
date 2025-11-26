let cart = [];

export function addToCart(book) {
  const existing = cart.find(item => item.id === book.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }
}

export function removeFromCart(bookId) {
  cart = cart.filter(item => item.id !== bookId);
}

export function getCartItems() {
  return cart;
}

export function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
