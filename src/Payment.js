import React, { useState } from 'react';
import axios from 'axios';
//import Navbar from "@/app/components/Navbar";
//import Footer from "@/app/components/Footer";
import styles from './Products.module.css'; // Import the CSS for custom styles

const Payment = ({ onPaymentSuccess }) => {
  const [amount, setAmount] = useState(100); 
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  const handlePayment = async (amount) => {
    try {
      const response = await axios.post('http://localhost:5001/create-order', {
        amount: amount*100, // Amount in paisa
      });

      const { order } = response.data;
      const options = {
        key: 'rzp_test_nCZGf3LzGUjN8M',
        amount: order.amount,
        currency: order.currency,
        name: 'INAARA AI SOLUTIONS PRIVATE LIMITED',
        description: 'Test Transaction',
        order_id: order.id,
        handler: async function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          onPaymentSuccess(response.razorpay_payment_id, order.id, order.amount);
          setIsPaymentCompleted(true);
        },
        prefill: {
          name: 'Test User',
          email: 'testuser@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error while creating payment:', error);
    }
  };

  return (<div className={styles.container}>
  {/* Navbar Section 
  <Navbar />*/}

  {/* Products Heading Section */}
  <section className={styles.heading}>
    <h1 className="text-4xl font-semibold mb-2">Make Payment</h1>
    <p className={styles.subheading}>Choose the best solution for your business needs</p>
  </section>

  {/* Products List Section */}
  <section className={styles.products}>
    {/* Android TV Product */}
    <div className={styles.productCard}>
      <h2 className={styles.productTitle}>Android TV</h2>
      <p className={styles.price}>₹12,000 / year</p>
      <ul className={styles.features}>
        <li>• Android TV software</li>
        <li>• Simple queue display</li>
        <li>• Easy-to-use interface</li>
      </ul>
      {!isPaymentCompleted && <button onClick={() => handlePayment(12000)}className={styles.selectButton}>Pay ₹12000</button>}
    </div>

    {/* TV + Dashboard Analytics Product */}
    <div className={styles.productCard}>
      <h2 className={styles.productTitle}>TV + Dashboard Analytics</h2>
      <p className={styles.price}>₹18,000 / year</p>
      <ul className={styles.features}>
        <li>• Android TV software</li>
        <li>• Detailed analytics dashboard</li>
        <li>• Track patient trends and metrics</li>
      </ul>
      {!isPaymentCompleted && <button onClick={() => handlePayment(18000)} className={styles.selectButton}>Pay ₹18000</button>}
    </div>

    {/* TV + Dashboard + AI Product (Recommended) */}
    <div className={`${styles.productCard} ${styles.recommended}`}>
      <h2 className={styles.productTitle}>TV + Dashboard + AI</h2>
      <p className={styles.price}>₹25,000 / year</p>
      <ul className={styles.features}>
        <li>• Android TV software</li>
        <li>• Advanced AI-powered analytics</li>
        <li>• Predictive insights and forecasts</li>
        <li>• Comprehensive dashboard reports</li>
      </ul>
      {!isPaymentCompleted && <button onClick={() => handlePayment(25000)} className={`${styles.selectButton} ${styles.recommendedButton}`}>Pay ₹25000</button>}
    </div>
  </section>

  {/* Optional message after payment completion */}
  {isPaymentCompleted && <p style={{ textAlign: 'center' }}>Payment completed successfully!</p>}

  {/* Footer Section 
  <Footer />*/}
</div>
);
};

export default Payment;
