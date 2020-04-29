const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');


exports.signup = (req, res) => {

    const user = new User(req.body);

    user.save((err, user) => {
       
        if(err) {
            return res.status(400).json({
                err: "Not able to add user in db.."
            })
        }

        res.json({
            "_id": user._id,
            "name": user.name,
            "email": user.email
        });
    })
}



exports.signin = (req, res) => {

    //find user based on email

    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        if(err){
            return res.status(400).json({
                err: "Unable to find user"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                err: "User name or password is wrong"
            })
        }

        //create token

        const token = jwt.sign({_id: user._id}, process.env.SECRET);

        //set token in cookie
        res.cookie = ("token", token, {expire: Date.now + 9999});

        const {_id, email, name, role} = user;

        res.json({
        token, _id, name, role, email
        })

    })
}


exports.signout = (req, res) => {

    res.clearCookie("token");

    res.json({
        "status":"signedout"
    })
}; 


//protected routes

exports.isSignedIn = expressJWT({
            
            secret: process.env.SECRET,
            userProperty: "auth"
        
         })


//custom middlewares

exports.isAuthenticated = (req, res, next) => {
   
    const checker = req.profile && req.auth && req.profile._id == req.auth._id;
    
    if(!checker) {
        return res.status(403).json({
            err: "ACCESS DENIED"
        })
    }

    next();
    
}


exports.isAdmin = (req, res, next) => {

    if(!req.profile.role === 0){
        return res.status(403).json({
            err: "You are not ADMIN"
        })
    }
    next();
}