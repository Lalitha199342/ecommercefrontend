
import api from "../../api/axios";
import {useNavigate} from 'react-router'
import formatMoney from '../../utilis/Money.js';
 function PaymentSummary({ paymentsummary ,loadCart}) {
  const navigate = useNavigate();
  const createOrder = async () => {
     await api.post('/api/orders');
     await loadCart();
     navigate('/orders');
  };
  return (

    <div className="payment-summary">
              <div className="payment-summary-title">
                Payment Summary
              </div>
          
          {paymentsummary && (
            <>
            
            

              <div className="payment-summary-row">
                <div>Items {paymentsummary.totalItems}:</div>
                <div className="payment-summary-money">
                  {formatMoney(paymentsummary.productCostCents)}
                </div>
              </div>

              <div className="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">
                  {formatMoney(paymentsummary.shippingCostCents)}
                </div>
              </div>

              <div className="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div className="payment-summary-money">
                  {formatMoney(paymentsummary.totalCostBeforeCents)}
                </div>
              </div>

              <div className="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div className="payment-summary-money">
                  {formatMoney(paymentsummary.taxCents)}
                </div>
              </div>

              <div className="payment-summary-row total-row">
                <div>Order total:</div>
                <div className="payment-summary-money">
                  {formatMoney(paymentsummary.totalCostCents)}
                </div>
              </div>

              <button className="place-order-button button-primary" onClick={createOrder}>
                Place your order
              </button>
              </>
            
          )}
        </div>

  )}
  export default PaymentSummary;