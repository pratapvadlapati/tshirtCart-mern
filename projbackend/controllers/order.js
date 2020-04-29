const { Order, ProductCart } = require('../models/order');


//params

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err,order)=> {
        if(err){
            return res.status(400).json({
                err: "Unable to get order"
            })
        }
        req.order = order;
        next();
    })
}


//Actual routes

//create order
exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, order)=>{
        if(err){
            return res.status(400).json({
                err: "Failed to save order"
            })
        }
        res.json(order);
    })
};

//get all orders
exports.getAllOrders = (req, res) => {
    Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
        if(err){
            return res.status(400).json({
                err: "No orders found"
            })
        }
        res.json(orders);
    })
}

//order-status controllers
exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
};

//update status 

exports.updateOrderStatus = (req, res) => {
    Order.update(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err, order) => {
            if(err){
                return res.status(400).json({
                    err: "Unable to save order status"
                })
            }
            res.json(order);
        }
    )
}