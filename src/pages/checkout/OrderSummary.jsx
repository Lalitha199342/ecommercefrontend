
import api from "../../api/axios";
import dayjs from "dayjs";
import formatMoney from "../../utilis/Money.js";
import DeliveryOptions from "./DeliveryOptions.jsx";

export default function OrderSummary({
  cart,
  deliveryOptions,
  loadCart
}) {
  const backendURL = import.meta.env.VITE_API_URL || "";

  // Get product image URL
  const getImageUrl = (image) => {
    if (!image) return "";

    if (/^https?:\/\//i.test(image)) {
      return image;
    }

    const path = image.startsWith("/")
      ? image
      : `/${image}`;

    return `${backendURL}${path}`;
  };

  // Delete product from cart
  const deleteCartItem = async (productId) => {
    try {
      await api.delete(`/api/cart-items/${productId}`);
      await loadCart();
    } catch (error) {
      console.error("Error deleting cart item:", error);
      alert("Unable to delete item. Please try again.");
    }
  };

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (option) =>
              option.id === cartItem.deliveryOptionId
          );

          const product = cartItem.product;

          return (
            <div
              key={cartItem.productId}
              className="cart-item-container"
            >
              <div className="delivery-date">
                Delivery date:{" "}
                {selectedDeliveryOption
                  ? dayjs(
                      selectedDeliveryOption.estimatedDeliveryTimeMs
                    ).format("dddd, MMMM D")
                  : "Not available"}
              </div>

              <div className="cart-item-details-grid">
                <img
                  className="product-image"
                  src={getImageUrl(product?.image)}
                  alt={product?.name || "Product"}
                />

                <div className="cart-item-details">
                  <div className="product-name">
                    {product?.name}
                  </div>

                  <div className="product-price">
                    {formatMoney(product?.priceCents ?? 0)}
                  </div>

                  <div className="product-quantity">
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">
                        {cartItem.quantity}
                      </span>
                    </span>

                    <span className="update-quantity-link link-primary">
                      Update
                    </span>

                    <button
                      type="button"
                      className="delete-quantity-link link-primary"
                      onClick={() =>
                        deleteCartItem(cartItem.productId)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <DeliveryOptions
                  cartItem={cartItem}
                  deliveryOptions={deliveryOptions}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
