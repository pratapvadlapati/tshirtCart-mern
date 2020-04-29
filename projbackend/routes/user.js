const express = require('express');
const router = express.Router();

const user = require('../controllers/user')
const auth = require('../controllers/auth');


router.param("userId", user.getUserById, user.updateUserById);

router.get("/user/:userId", auth.isSignedIn, auth.isAuthenticated, user.getUser);

router.put("/user/:userId", auth.isSignedIn, auth.isAuthenticated, user.updateUserById);

router.get("/orders/user/:userId", auth.isSignedIn, auth.isAuthenticated, user.ordersById);

router.get("/user/all", (req, res) => {
    res.send('HI');
});

module.exports = router;