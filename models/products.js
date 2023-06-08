const mongoose = require("mongoose")
const Schema = mongoose.Schema

let ProductSchma = new Schema({
    name:String,
    description:String,
    price:Number
},{
    timestamps:true
})


module.exports = mongoose.model('Products', ProductSchma);
