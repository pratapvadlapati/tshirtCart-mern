const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Product = require('../models/product');

//middleware
exports.getProductById = (req, res, next, id) => {
   
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return    res.status(400).json({
               err: "Unable to find product"
            })
        }
        req.product = product;  
        next();    
    })
    
}


exports.updateStock = (req, res, next) => {
    let myOperations = req.order.products.map(product => {

        return {
            updateOne: {
                filter: {"_id": product._id},
                update: {$inc: {stock: -product.count, sold: +product.count}}
            }
        }
       
    })

    Product.bulkWrite(myOperations, {}, (err, products)=> {
        if(err){
            return res.status(400).json({
                err: "Bulk operation failed"
            })
        }
        next();
    })
}



//get photo middleware
//middleware
/* exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
      res.set("Content-Type", req.product.photo.contentType);
      return res.send(req.product.photo.data);
    }
    next();
  }; */
//

//get product 
exports.getProduct  = (req, res) => {

    return res.json(req.product);
}

//create product
exports.createProduct = (req, res) => {
   
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
       
        if(err) {
            console.log(err);
            return res.status(400).json({
                err: "Unable to create Product"
            })
        }

        //restriction on fields
        //destructre of fields

        const { name, description, category, price, stock } = fields;
        
        if( !name ||
            !description ||
            !category ||
            !price ||
            !stock){
                return res.status(400).json({
                    err: "Please include all fields"
                })
        }

         
        let product = new Product(fields);
       
        //handle file
       if(file.photo) {
        if(file.photo.size > 3000000) {
            return res.status(400).json({
                err: "File size is too big"
            })
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
       }
       
       //save to DB
       product.save((err, product) =>{
           if(err){
               return res.status(400).json({
                   err: "saving product in db failed"
               })
           }
           res.json(product);
       })

    })
}


//update product
exports.updateProduct = (req, res) => {
    let form = formidable.IncomingForm();
        form.keepExtensions = true;

        form.parse(req, (err, fields, file) => {
            if(err) {
                return res.status(400).json({
                    err: "Unable to update product"
                })
            }

            //updation code
            let product =  req.product;
                product = _.extend(product, fields);

            if(file.photo){
            if(file.photo.size > 3000000) {
                return res.status(400).json({
                    err: "file is too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
            //save in db
            product.save((err, Updatedproduct) => {
                if(err) {
                    return res.status(400).json({
                        err: "Unable to update product in db"
                    })
                }
                res.json(Updatedproduct);
            })
        })


}

//delete product
exports.deleteProduct = (req, res) => {
    let product = req.product;
    console.log(product);
    product.remove((err, product) => {
        if(err) {
            return res.status(400).json({
                err: "Unable to delete product"
            })
        }

        res.json({
            message: "Deletion of product was success"
        })
    })

}


//get all products
exports.AllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sort ? req.query.sort : "asc"
    
    Product.find()
    .populate("category")
    .select("-photo")
    .limit(limit)
    .sort([[sortBy]])
    .exec((err, products) => {
        if(err) {
            return res.status(400).json({
                err: "Unable to find all products"
            })
        }

        res.json(products);
    })
}

//distinct categories
exports.distinctCategories = (req, res) => {
   
    Product.distinct("category", (err, categories)=>{
        if(err){
            return res.status(400).json({
                err: "No Category found"
            })
        }
        res.json(categories);
    })

}


