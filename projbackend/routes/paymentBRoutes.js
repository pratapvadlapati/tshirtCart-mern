const express = require('express');
const router = express.Router();


const auth = require('../controllers/auth')
const payment = require('../controllers/paymentB')



//get token
router.get("/payment/token/:userId",  payment.getToken);



//proceed with payment
router.post("/payment/paypal/:userId", auth.isSignedIn, auth.isAuthenticated, payment.processPayment)

module.exports = router;