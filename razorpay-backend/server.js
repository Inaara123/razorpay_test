const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const fs = require('fs'); 
const app = express();
const path = require('path');
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: 'rzp_test_nCZGf3LzGUjN8M', // Replace with your Razorpay key ID
  key_secret: '2Uv5lRU3vTYqPSH5fHAlnqGD', // Replace with your Razorpay secret key
});

app.post('/create-order', async (req, res) => {
  const { amount } = req.body;
  console.log('amount',amount);
  const options = {
    amount: amount, // Amount in paisa (e.g., 50000 paisa = 500 INR)
    currency: 'INR',
    receipt: 'receipt_order_74394',
  };

  try {
    const order = await razorpay.orders.create(options);
      res.json({
        order
      });
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
});

app.post('/generate-receipt', async (req, res) => {
    const { paymentId, orderId, amount, hospitalName, administrator, address, plan, paymentDate, modeOfPayment, contactNumber } = req.body;
    
    
    const fileName = `receipt_${paymentId}.pdf`;
    
      // Send the receipt download link back to the frontend
      res.json({
        receiptUrl: `http://localhost:5001/receipts/${fileName}`, // Assuming the file is served from this path
      });
  });

// Serve the receipt files statically
app.use('/receipts', express.static('receipts'));

app.listen(5001, () => {
  console.log('Server started on port 5001');
});
