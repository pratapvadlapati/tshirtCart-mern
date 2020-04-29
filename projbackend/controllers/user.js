const User = require('../models/user');
const Order = require('../models/order');


exports.getUserById = (req, res, next, id) => {

    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(404).json({
                err: "user doesnt exist"
            })
        }
        req.profile = user;
        next();
    })
}



exports.getUser = (req, res) => {
    
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile)
}


exports.updateUserById = (req, res) => {

    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        {new: true, useFindAndModify: false},
        (err, user) => {
            if(err || !user) {
                return res.status(400).json({
                    err: "not authorized to update"
                })
            }

            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);
        

    })
}

//get all users
exports.getAllUsers = (req, res) => {
    User.find({}).exec((err, users) => {
        if(err){
            return res.json(400).json({
                err: "Unable to get users"
            })
        }

        return res.json(users);
    })
};


exports.ordersById = (req, res) => {

    Order.findById({user: req.profile._id})
        .populate("user", "name _id")
        .exec((err, orders) => {
            if(err) {
                return res.status(400).json({
                    err: "no orders found for user"
                })
            }

           return res.json(orders);
        })
}


//push purchases into user model purchases array  - middleware

exports.pushOrdersinPurchaseList = (req, res, next) =>{

    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id

        })
    });


    //store this purchases in db -user-purchase array
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (err, purchases)=>{
            if(err){
                return json.status(400).json({
                    err: "Unable to save purchases"
                })
            }
            next()
        })  
}