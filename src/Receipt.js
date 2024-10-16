import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

const Receipt = ({ paymentId, orderId, amount, hospitalDetails, paymentDate, planExpiryDate }) => {
  const receiptRef = useRef();
  const buttonRef = useRef();
  const generationDate = new Date().toLocaleString();

  const downloadPDF = () => {
    const element = receiptRef.current;
    const buttonElement = buttonRef.current;

    if (buttonElement) buttonElement.style.display = 'none';
    const options = {
      filename: 'payment_receipt.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf()
      .set(options)
      .from(element)
      .save()
      .then(() => {
        if (buttonElement) buttonElement.style.display = 'block';
      });
  };

  return (
    <div>
        <h2>Payment Receipt</h2>
    <div ref={receiptRef} style={receiptContainerStyle}>
      <div style={headerStyle}>
        <img src="/logo_inaara.png" alt="Company Logo" style={{ float: 'left', marginRight: '10px', width: '100px', height: '100px' }} />
        <div style={{ textAlign: 'right' }}>
          <h3>INAARA AI SOLUTIONS PRIVATE LIMITED</h3>
          <p>Church road, HUDA Colony, Hyderabad, India</p>
          <p>Phone: +91-8106134951</p>
          <p>Email: tech@inaara.ai</p>
        </div>
      </div>

      <h3 style={{ textAlign: 'center', margin: '20px 0', textDecoration: 'underline' }}>Payment Receipt</h3>

      <div style={detailsContainerStyle}>
        <div style={leftColumnStyle}>
          <p><strong>Payment Status:</strong> Success</p>
          <p><strong>Payment ID:</strong> {paymentId}</p>
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Amount:</strong> ₹{(amount / 100).toFixed(2)}</p>
          <p><strong>Mode of Payment:</strong> {hospitalDetails.modeOfPayment}</p>
        </div>
        <div style={rightColumnStyle}>
          <p><strong>Payment Date:</strong> {paymentDate}</p>
          <p><strong>Plan Expiry Date:</strong> {planExpiryDate}</p>
          <p><strong>Hospital Name:</strong> {hospitalDetails.hospitalName}</p>
          <p><strong>Contact Number:</strong> {hospitalDetails.contactNumber}</p>
          <p><strong>Address:</strong> {hospitalDetails.address}</p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button ref={buttonRef} onClick={downloadPDF} style={buttonStyle}>Download Receipt as PDF</button>
      </div>
      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#777' }}>
        Receipt generated on: {generationDate}
      </p>
    </div>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#3399cc',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const receiptContainerStyle = {
  marginTop: '20px',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid #ccc',
  paddingBottom: '10px',
};

const detailsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
};

const leftColumnStyle = {
  width: '45%',
  lineHeight: '1.6',
};

const rightColumnStyle = {
  width: '45%',
  lineHeight: '1.6',
};

export default Receipt;
