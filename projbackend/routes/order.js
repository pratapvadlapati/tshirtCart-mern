const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');
const user = require('../controllers/user');
const product = require('../controllers/product');
const order = require('../controllers/order');


//params
router.param("orderId", order.getOrderById)
router.param("userId", user.getUserById);



//Actual routes

//create order
router.post("/order/create/:userId", 
                    auth.isSignedIn,
                     auth.isAuthenticated,
                      user.pushOrdersinPurchaseList,
                       product.updateStock,
                        order.createOrder);

//get All orders
router.get("/order/all",auth.isSignedIn, auth.isAuthenticated, auth.isAdmin,  order.getAllOrders);

//status routes
router.get("/order/status");
router.put("/order/:orderId/status/:userId")


module.exports = router;