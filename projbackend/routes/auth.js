const express = require('express');
const router = express.Router();


const auth = require('../controllers/auth');

router.post('/signup', auth.signup);

router.post('/signin', auth.signin);

router.get('/signout', auth.signout);


//test
router.get('/test', auth.isSignedIn, (req, res) => {
    res.send('protected route!');
})


module.exports = router;