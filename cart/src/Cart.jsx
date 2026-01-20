import React, { useState } from "react";
import "./Cart.css";

const sampleCartItems = [
  { id: 1, name: "Laptop", price: 999.99, quantity: 1 },
  { id: 2, name: "Smartphone", price: 699.99, quantity: 2 },
  { id: 3, name: "Headphones", price: 199.99, quantity: 1 },
];

function Cart() {
  const [cartItems, setCartItems] = useState(sampleCartItems);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <p className="subtitle">Review your items and checkout</p>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <div className="image-placeholder">
                    {item.name.charAt(0)}
                  </div>
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">${item.price.toFixed(2)} each</p>
                </div>
                <div className="item-quantity">
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    −
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  <span className="total-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>$10.00</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(calculateTotal() + 10).toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
