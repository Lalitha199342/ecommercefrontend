
import "./HomePage.css";
import Header from "../../components/Header.jsx";
import ProductsGrid from "./ProductsGrid.jsx";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearch } from "../../components/SearchContext.jsx";

function HomePage({ cart = [], loadCart, wishlist = [], dispatch }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { search = "" } = useSearch();

  // Fetch products with error handling
  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("/api/products");

      if (!Array.isArray(response.data)) {
        throw new Error("Invalid products data");
      }

      setProducts(response.data);

    } catch (err) {
      console.error("Error loading products:", err);

      setProducts([]);

      if (err.response?.status === 404) {
        setError("Products API not found.");
      } else if (err.response?.status >= 500) {
        setError("Server error. Please try again later.");
      } else if (err.code === "ERR_NETWORK") {
        setError("Network error. Please check your connection.");
      } else {
        setError("Unable to load products. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Wishlist functionality
  const toggleWishlist = (product) => {
    if (!dispatch) return;

    const isLiked = wishlist.some(
      (item) => item.id === product.id
    );

    if (isLiked) {
      dispatch({
        type: "REMOVE",
        id: product.id
      });
    } else {
      dispatch({
        type: "ADD",
        product: product
      });
    }
  };

  // Safe product search
  const filteredProducts = products.filter((product) =>
    String(product?.name ?? "")
      .toLowerCase()
      .includes(String(search ?? "").trim().toLowerCase())
  );

  return (
    <>
      <title>Ecommerce Project</title>

      <Header cart={cart} wishlist={wishlist} />

      <div className="home-page">

        {loading ? (
          <div className="loading-message">
            <h3>Loading products...</h3>
          </div>

        ) : error ? (
          <div className="error-box">
            <h2>Something went wrong!</h2>
            <p>{error}</p>

            <button
              type="button"
              onClick={fetchProducts}
            >
              Try Again
            </button>
          </div>

        ) : filteredProducts.length === 0 ? (
          <div className="no-products">
            <h2>No products found</h2>
            <p>Try searching for another product.</p>
          </div>

        ) : (
          <ProductsGrid
            products={filteredProducts}
            loadCart={loadCart}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        )}

      </div>
    </>
  );
}

export default HomePage;
