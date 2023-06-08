const mongoose = require("mongoose")
const Schema = mongoose.Schema

let cartSchema = new Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    productId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Products'},
    quantity:Number,
    price:Number
},{
    timestamps:true
})

module.exports = mongoose.model('Cart', cartSchema);
