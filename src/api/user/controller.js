const Model = require('../../../models/index')
const helper = require("../../helper");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports = {


  siginup: async (req, res) => {
    try {
      let payload = req.body
      const userData = await Model.Users.findOne({ email: payload.email })
      if (userData) throw "Email Allready exist"
      const passdata = await bcrypt.hash(payload.password, 10);
      payload.password = passdata
      const data = await Model.Users.create(payload)
      await helper.success(res, "User Signup Seccessfully", data);
    } catch (error) {
      console.log(error)
      await helper.error(res, error);


    }
  },

  login: async (req, res) => {
    try {
      let payload = req.body
      const findata = await helper.userData(payload.email)
      if (!findata) throw "Please Enter Crrect Email"
      const passdata = bcrypt.compare(payload.password, findata.password)
      if (passdata == false) throw "Increct password"
      let authdata = {
        id: findata._id,
        email: findata.email
      }
      const Token = jwt.sign({ authdata }, "shhhhhhared-secret");
      let data = await Model.Users.updateOne({ _id: findata._id }, { accessToken: Token })
      const userdata = await helper.userData(payload.email)
      await helper.success(res, "User login Seccessfully", userdata);
    } catch (error) {
      console.log('--data', error)
      await helper.error(res, error)
    }
  },

  userdata: async (req, res) => {
    try {
      console.log(req.user.authdata)
      const data = await Model.Users.findById(req.user.authdata.id)
      await helper.success(res, "User Data get Seccessfully", data);
    } catch (error) {
      await helper.error(res, error)
    }

  },

  addProduct: async (req, res) => {
    try {
      let payload = req.body
      const productData = await Model.Products.findOne({ name:payload.name })
      if(productData) throw "Product allready exist"
      const data = await Model.Products.create(payload )
      await helper.success(res, "Add Product Seccessfully", data);
    } catch (error) {
      await helper.error(res, error)
    }

  },


  getProduct: async (req, res) => {
    try {
      console.log(req.user.authdata)
      const data = await Model.Products.find()
      await helper.success(res, "Product Data get Seccessfully", data);
    } catch (error) {
      await helper.error(res, error)
    }

  },

  addToCart: async (req, res) => {
    try {
     let payload = req.body
      let data = await Model.Cart.findOne({$and: [ { productId:payload.productId}, {userId:payload.userId}]})
      if(!data){
        data = await Model.Cart.create(payload)
      }else{
        payload.quantity=parseInt(payload.quantity)+parseInt(data.quantity)
        payload.price=parseInt(payload.price)+parseInt(data.price)
        if( payload.price < 0){
          throw "please enter valid price"
        }
        if( payload.quantity < 0){
          throw "please enter valid quantity"
        }  
       await Model.Cart.updateOne({_id:data._id},{price:payload.price,quantity:payload.quantity})
       data = await Model.Cart.findOne({$and: [ { productId:payload.productId}, {userId:payload.userId}]})
       if(data.quantity==0){
        await Model.Cart.deleteOne(data._id)
        return await helper.success(res, "Iteam remove successfully",{});
       }
      }
      await helper.success(res, "Iteam added Seccessfully", data);
    } catch (error) {
      await helper.error(res, error)
    }

  },

  getCart: async (req, res) => {
    try {
      const data = await Model.Cart.find({userId:req.user.authdata.id}).populate("userId productId")
      await helper.success(res, "Cart Data get Seccessfully", data);
    } catch (error) {
      await helper.error(res, error)
    }

  },










 



};
