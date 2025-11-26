// Helper UI utilities used across components
export function formatPrice(amount) {
  return amount.toFixed(2);
}

export function currencySymbol() {
  return "₹"; // change to '$' if you prefer
}
