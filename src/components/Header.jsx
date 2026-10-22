
import { Link } from "react-router";
import "./header.css";
import { useThemeMode } from "./ThemeContext.jsx";
import { useSearch } from "./SearchContext.jsx";

function Header({ cart = [], wishlist = [] }) {
  const { darkMode, toggleTheme } = useThemeMode();
  const { search, setSearch } = useSearch();

  // Calculate total cart quantity
  let totalQuantity = 0;

  cart.forEach((cartitem) => {
    totalQuantity += cartitem.quantity;
  });

  // Get logged-in user
  const user = JSON.parse(
    localStorage.getItem("loggedInUser") || "null"
  );

  return (
    <div className="header">

      {/* LEFT SECTION */}
      <div className="left-section">
        <Link to="/" className="header-link">
          <img
            className="logo"
            src="/images/images.jpg"
            alt="Logo"
          />
          <img
            className="mobile-logo"
            src="/images/mobile-logo-white.png"
            alt="Mobile Logo"
          />
        </Link>
      </div>

      {/* MIDDLE SECTION */}
      
      <div className="middle-section">
        <input
  className="search-bar"
  type="search"
  placeholder="Search products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

        <button className="search-button" type="button">
          <img
            className="search-icon"
            src="/images/icons/search-icon.png"
            alt="Search"
          />
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div className="right-section">

        {/* DARK MODE */}
        <button
          type="button"
          className="theme-btn"
          onClick={toggleTheme}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* ORDERS */}
        <Link
          className="orders-link header-link"
          to="/orders"
        >
          <span className="orders-text">Orders</span>
        </Link>

        {/* WISHLIST */}
        <Link
          to="/wishlist"
          className="wishlist-link header-link"
        >
          <span className="wishlist-icon-container">
            ❤️
            {wishlist.length > 0 && (
              <span className="wishlist-count">
                {wishlist.length}
              </span>
            )}
          </span>
          <span className="wishlist-text">Wishlist</span>
        </Link>

        {/* CART */}
        <Link
          className="cart-link header-link"
          to="/checkout"
        >
          <img
            className="cart-icon"
            src="/images/icons/cart-icon.png"
            alt="Cart"
          />

          <div className="cart-quantity">
            {totalQuantity}
          </div>

          <div className="cart-text">Cart</div>
        </Link>

        {/* USER / LOGIN */}
        <div className="user-section">
          {user ? (
            <h3>Hello, {user.name}!</h3>
          ) : (
            <Link to="/login" className="login-text">
              Login
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}

export default Header;
