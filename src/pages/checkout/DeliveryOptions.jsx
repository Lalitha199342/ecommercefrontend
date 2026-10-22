
import api from "../../api/axios";
import dayjs from "dayjs";
import formatMoney from "../../utilis/Money.js";
import { useState } from "react";

export default function DeliveryOptions({
  cartItem,
  deliveryOptions,
  loadCart
}) {
  const [updating, setUpdating] = useState(false);

  const updateDeliveryOption = async (deliveryOptionId) => {
    if (updating || deliveryOptionId === cartItem.deliveryOptionId) {
      return;
    }

    try {
      setUpdating(true);

      await api.put(`/api/cart-items/${cartItem.productId}`, {
        deliveryOptionId: deliveryOptionId,
      });

      await loadCart();
    } catch (error) {
      console.error("Error updating delivery option:", error);
      alert("Unable to update delivery option. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>

      {deliveryOptions.map((deliveryOption) => {
        const priceString =
          deliveryOption.priceCents > 0
            ? `${formatMoney(deliveryOption.priceCents)} - Shipping`
            : "FREE Shipping";

        return (
          <label
            key={deliveryOption.id}
            className="delivery-option"
          >
            <input
              type="radio"
              name={`delivery-option-${cartItem.productId}`}
              className="delivery-option-input"
              checked={
                deliveryOption.id === cartItem.deliveryOptionId
              }
              disabled={updating}
              onChange={() =>
                updateDeliveryOption(deliveryOption.id)
              }
            />

            <div>
              <div className="delivery-option-date">
                {dayjs(
                  deliveryOption.estimatedDeliveryTimeMs
                ).format("dddd, MMMM D")}
              </div>

              <div className="delivery-option-price">
                {priceString}
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
}
