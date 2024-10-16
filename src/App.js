import React, { useState } from 'react';
import Payment from './Payment';
import Receipt from './Receipt';

const App = () => {
  const [paymentId, setPaymentId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [amount, setAmount] = useState(100); // Amount in paisa
  const [hospitalDetails, setHospitalDetails] = useState({
    hospitalName: 'City Hospital',
    administrator: 'Dr. John Doe',
    address: '123 Hospital Road, Metropolis, 54321',
    plan: 'TV + Dashboard',
    modeOfPayment: 'Internet Banking',
    contactNumber: '0123456789',
  });
  const [paymentDate, setPaymentDate] = useState(null);
  const [planExpiryDate, setPlanExpiryDate] = useState(null);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  const handlePaymentSuccess = (paymentId, orderId, amount) => {
    setPaymentId(paymentId);
    setOrderId(orderId);
    setAmount(amount);
    setPaymentDate(new Date().toLocaleDateString());

    // Set expiry date (one year from today)
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    setPlanExpiryDate(expiryDate.toLocaleDateString());

    setIsPaymentCompleted(true);
  };

  return (
    <div>
      {!isPaymentCompleted ? (
        <Payment onPaymentSuccess={handlePaymentSuccess} />
      ) : (
        <Receipt
          paymentId={paymentId}
          orderId={orderId}
          amount={amount}
          hospitalDetails={hospitalDetails}
          paymentDate={paymentDate}
          planExpiryDate={planExpiryDate}
        />
      )}
    </div>
  );
};

export default App;
