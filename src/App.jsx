
import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";

import HomePage from "./pages/home/HomePage";
import CheckoutPage from "./pages/checkout/CheckoutPage.jsx";
import OrdersPage from "./pages/orders/OrdersPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Wishlist from "./components/Wishlist.jsx";
import {   useReducer } from "react";
import { wishlistReducer } from "./components/Wishlistreducer.js";

import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  
  const [products, setProducts] = useState([]);
  const [wishlist, dispatch] = useReducer(
  wishlistReducer,
  [],
  () => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch {
      return [];
    }
  }
);

useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}, [wishlist]);

  const loadCart = async () => {
    const response = await axios.get(
      "/api/cart-items?expand=product"
    );
    setCart(response.data);
  };

  const loadProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  useEffect(() => {
    loadCart();
    loadProducts();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        index
        element={
          <HomePage
            cart={cart}
            loadCart={loadCart}
            wishlist={wishlist}
      dispatch={dispatch}
          />
        }
      />

      <Route
        path="/checkout"
        element={
          <CheckoutPage
            cart={cart}
            loadCart={loadCart}
          />
        }
      />

      <Route
        path="/orders"
        element={
          <OrdersPage
            cart={cart}
            loadCart={loadCart}
          />
        }
      />
     
  

<Route
  path="/wishlist"
  element={
    <Wishlist
      wishlist={wishlist}
      dispatch={dispatch}
    />
  }
/>
    </Routes>
  );
}

export default App;
