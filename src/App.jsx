
import { useState, useEffect, useReducer } from "react";
import { Routes, Route } from "react-router";
import api from "./api/axios";

import HomePage from "./pages/home/HomePage";
import CheckoutPage from "./pages/checkout/CheckoutPage.jsx";
import OrdersPage from "./pages/orders/OrdersPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Wishlist from "./components/Wishlist.jsx";
import { wishlistReducer } from "./components/Wishlistreducer.js";

import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

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

  // Save wishlist in localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Load cart from Render backend
  const loadCart = async () => {
    try {
      const response = await api.get(
        "/api/cart-items?expand=product"
      );
      setCart(response.data);
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
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
