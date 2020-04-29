const express = require('express');
const router = express.Router();



const auth = require('../controllers/auth');
const user = require('../controllers/user');
const product = require('../controllers/product');


//param routes
router.param("userId", user.getUserById);
router.param("productId", product.getProductById);




//actual routes

router.get("/product/:productId", product.getProduct);

//create product
router.post("/product/create/:userId", auth.isSignedIn, auth.isAuthenticated, auth.isAdmin, product.createProduct);


//update product
router.put("/product/:productId/:userId", auth.isSignedIn, auth.isAuthenticated, auth.isAdmin, product.updateProduct)

//delete product
router.delete("/product/:productId/:userId", auth.isSignedIn, auth.isSignedIn, auth.isAuthenticated, product.deleteProduct);

//list all products
router.get("/product/list/allproducts", product.AllProducts);


//get distinctCategoreis
router.get("product/distinctCategories", product.distinctCategories)


//get photo
//router.get("product/photo/:productId", product.photo);

module.exports = router;