import React, { useState } from "react";
import "./Products.css";

const initialProducts = [
  { id: 1, name: "Laptop", price: 999.99, description: "High-performance laptop" },
  { id: 2, name: "Smartphone", price: 699.99, description: "Latest smartphone model" },
  { id: 3, name: "Headphones", price: 199.99, description: "Wireless noise-cancelling headphones" },
  { id: 4, name: "Tablet", price: 499.99, description: "10-inch tablet with stylus" },
  { id: 5, name: "Smartwatch", price: 299.99, description: "Fitness tracking smartwatch" },
  { id: 6, name: "Camera", price: 799.99, description: "Professional DSLR camera" },
];

function Products() {
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="products-container">
      <h1>Products</h1>
      <p className="subtitle">Browse our amazing product catalog</p>
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <div className="image-placeholder">
                {product.name.charAt(0)}
              </div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <p>Items in cart: {cart.length}</p>
        </div>
      )}
    </div>
  );
}

export default Products;
