import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

const Products = React.lazy(() => import("products/Products"));
const Cart = React.lazy(() => import("cart/Cart"));

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="logo">Microfrontend Shell</h1>
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <React.Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              <Route
                path="/"
                element={
                  <div className="home">
                    <h2>Welcome to Microfrontend Architecture</h2>
                    <p>
                      This is the shell application that orchestrates multiple
                      microfrontends.
                    </p>
                    <div className="features">
                      <div className="feature-card">
                        <h3>Products Microfrontend</h3>
                        <p>Browse and manage products</p>
                        <Link to="/products" className="btn">
                          Go to Products
                        </Link>
                      </div>
                      <div className="feature-card">
                        <h3>Cart Microfrontend</h3>
                        <p>View and manage your cart</p>
                        <Link to="/cart" className="btn">
                          Go to Cart
                        </Link>
                      </div>
                    </div>
                  </div>
                }
              />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </React.Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
