const mongoose = require("mongoose")
const Schema = mongoose.Schema

let UserSchma = new Schema({
    name:String,
    email:String,
    password:String,
    accessToken:String,
    address:Object
},{
    timestamps:true
})


module.exports = mongoose.model('Users', UserSchma);
