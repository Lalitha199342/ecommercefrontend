
import api from "../../api/axios";
import { useState, useEffect } from 'react';

import './CheckoutPage.css';
import './checkout-header.css';
import PaymentSummary from './PaymentSummary.jsx';
import OrderSummary from './OrderSummary.jsx';

function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentsummary, setPaymentsummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        setLoading(true);
        setError('');

        const deliveryResponse = await api.get(
          '/api/delivery-options?expand=estimatedDeliveryTime'
        );

        setDeliveryOptions(deliveryResponse.data);

        const paymentResponse = await api.get(
          '/api/payment-summary'
        );

        setPaymentsummary(paymentResponse.data);
      } catch (err) {
        console.error('Error fetching checkout data:', err);
        setError('Unable to load checkout details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutData();
  }, [cart]);

  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="/images/images.jpg" alt="Logo" />
              <img
                className="mobile-logo"
                src="/images/images.jpg"
                alt="Logo"
              />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <a className="return-to-home-link" href="/">
              {cart.length} items
            </a>
            )
          </div>

          <div className="checkout-header-right-section">
            <img
              src="images/icons/checkout-lock-icon.png"
              alt="Secure checkout"
            />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        {loading ? (
          <p>Loading checkout details...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="checkout-grid">
            <OrderSummary
              cart={cart}
              deliveryOptions={deliveryOptions}
              loadCart={loadCart}
            />

            <PaymentSummary
              paymentsummary={paymentsummary}
              loadCart={loadCart}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default CheckoutPage;