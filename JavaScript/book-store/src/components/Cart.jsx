import React, { useState, useEffect } from "react";
import {
  getCart,
  removeFromCart,
  updateQuantity,
  cartTotal,
  clearCart,
} from "../modules/cartManager";

import { currencySymbol, formatPrice } from "../modules/uiUtils";

export default function Cart({ onChange }) {
  const [items, setItems] = useState(getCart());
  const [checkoutMode, setCheckoutMode] = useState(false);

  useEffect(() => {
    // When cartManager was changed by other parts (like addToCart), we want to refresh
    setItems(getCart());
  }, []);

  function refresh() {
    const current = getCart();
    setItems(current);
    onChange?.(current);
  }

  function handleRemove(id) {
    removeFromCart(id);
    refresh();
  }

  function handleQtyChange(id, newQty) {
    updateQuantity(id, newQty);
    refresh();
  }

  function handleClear() {
    clearCart();
    refresh();
  }

  const total = cartTotal();

  if (checkoutMode) {
    return (
      <div className="cart checkout">
        <h3>Mock Checkout</h3>
        <p>
          You will be charged: {currencySymbol()} {formatPrice(total)}
        </p>
        <button
          onClick={() => {
            setCheckoutMode(false);
          }}
        >
          Back to Cart
        </button>
        <button
          onClick={() => {
            handleClear();
            setCheckoutMode(false);
          }}
        >
          Complete (mock)
        </button>
      </div>
    );
  }
  return (
    <aside className="cart">
      <h3>Shopping Cart</h3>
      {items.length === 0 ? (
        <p className="empty">Your cart is empty</p>
      ) : (
        <ul className="cart-list">
          {items.map((it) => (
            <li key={it.id} className="cart-item">
              <div className="cart-item-info">
                <strong>{it.title}</strong>
                <small>by {it.author}</small>
              </div>
              <div className="cart-item-controls">
                <input
                  type="number"
                  min="1"
                  value={it.qty}
                  onChange={(e) =>
                    handleQtyChange(it.id, parseInt(e.target.value || "0", 10))
                  }
                />
                <span>
                  {currencySymbol()} {formatPrice(it.price * it.qty)}
                </span>
                <button onClick={() => handleRemove(it.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-footer">
        <div className="total">
          Total: {currencySymbol()} {formatPrice(total)}
        </div>
        <div className="cart-actions">
          <button
            onClick={() => setCheckoutMode(true)}
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </button>
          <button onClick={handleClear} className="muted">
            Clear
          </button>
        </div>
      </div>
    </aside>
  );
}
