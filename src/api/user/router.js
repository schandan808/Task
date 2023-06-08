const express = require("express");
const router = express.Router();
// const jwt = require('jsonwebtoken');
const { authenticateToken } = require("../../token");
const controller = require("./controller");


router.post('/signup', controller.siginup)
router.post('/login', controller.login)
router.get('/userdata', authenticateToken, controller.userdata)
router.post("/addProduct",authenticateToken,controller.addProduct)
router.get('/getProduct', authenticateToken, controller.getProduct)
router.post('/addToCart', authenticateToken, controller.addToCart)
router.get('/getCart', authenticateToken, controller.getCart)






module.exports = router;

