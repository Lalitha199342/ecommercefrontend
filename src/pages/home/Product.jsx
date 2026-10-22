
import api from "../../api/axios.js";
import { useState } from "react";
import formatMoney from "../../utilis/Money.js";

function Product({
  product,
  loadCart,
  wishlist = [],
  toggleWishlist
}) {
  const [quantity, setQuantity] = useState(1);

  const backendURL =
    import.meta.env.VITE_API_URL || "";

  // Handle backend images and local development
  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    const path = image.startsWith("/")
      ? image
      : `/${image}`;

    return `${backendURL}${path}`;
  };

  // Add to Cart
  const addToCart = async () => {
    try {
      await api.post("/api/cart-items", {
        productId: product.id,
        quantity: quantity,
      });

      await loadCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Select quantity
  const selectQuantity = (event) => {
    setQuantity(Number(event.target.value));
  };

  // Check if product is in wishlist
  const isLiked = wishlist.some(
    (item) => item.id === product.id
  );

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          src={getImageUrl(product.image)}
          alt={product.name}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={getImageUrl(
            `images/ratings/rating-${product.rating.stars * 10}.png`
          )}
          alt="Product rating"
        />

        <div className="product-rating-count link-primary">
          {product.ratingCount}
        </div>
      </div>

      <div className="product-price">
        {formatMoney(product.priceCents)}
      </div>

      <div className="product-quantity-container">
        <select
          value={quantity}
          onChange={selectQuantity}
        >
          {[1,2,3,4,5,6,7,8,9,10].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart">
        <img
          src={getImageUrl("images/icons/checkmark.png")}
          alt=""
        />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        onClick={addToCart}
      >
        Add to Cart
      </button>

      <button
        type="button"
        className={`wishlist-btn ${isLiked ? "active" : ""}`}
        onClick={() => toggleWishlist(product)}
      >
        {isLiked
          ? "❤️ Remove from Wishlist"
          : "🤍 Add to Wishlist"}
      </button>
    </div>
  );
}

export default Product;
