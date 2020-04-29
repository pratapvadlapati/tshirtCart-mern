const mongose = require('mongoose');

categorySchema = new mongose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
    
},
    {
        timestamps: true
    })



module.exports = mongose.model('Category', categorySchema);