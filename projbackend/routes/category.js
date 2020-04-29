const express = require('express');
const router = express.Router();

const user = require('../controllers/user')
const auth = require('../controllers/auth');
const category = require('../controllers/category');

//param routes
router.param("userId", user.getUserById);
router.param("categoryId", category.getCategoryById);



//actual routes
router.post("/category/create/:userId", auth.isSignedIn, auth.isAuthenticated, auth.isAdmin, category.createCategory);

router.put("/category/:categoryId/:userId", auth.isSignedIn, auth.isAuthenticated, auth.isAdmin, category.updateCategory);

router.delete("/category/:categoryId/:userId", auth.isSignedIn, auth.isAuthenticated, auth.isAdmin, category.removeCategory);

router.get("/category/all", category.getAllCategory);


module.exports = router;