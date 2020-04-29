const Category = require('../models/category');


// custom-middleware
exports.getCategoryById = (req, res, next, id) =>{
    Category.findById(id).exec((err, category)=>{
        if(err || !category){
            return res.status(400).json({
                err: "Unable to find category"
            })
        }
        console.log('id' + category);
       req.category = category;
       next();
    })
}


// methods
exports.createCategory = (req, res) =>{
    const category = new Category(req.body);
    category.save((err, category)=>{
        if(err){
            return res.status(400).json({
                err: "Unable to create category"
            })
        }
        res.json({category});
    })
}


exports.getCategory = (req, res) => {

    return res.json(req.category);
}


exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err){
            return res.status(400).json({
                err: "Unable to find categories"
            })
        }

        res.json(categories);
    })
}


exports.updateCategory = (req, res) => {

    let category = req.category;
    category.name  = req.body.name;
    category.save((err, updatedCategory) => {
        if(err){
            console.log(err);
            return res.status(400).json({
                err: "Unable to update category"
            })
        }

        return res.json(updatedCategory);
    })

}


exports.removeCategory = (req, res) => {
    const category = req.category;
    console.log(category);
    category.remove((err, category) => {
        if(err){
            return res.status(400).json({
                err: "Unable to remove category"
            })
        }

        return res.json({
            message: `successfully delted ${category.name}`
        })
    })
}