const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    product_id:Number,
    user_email:String,
    image:String,
    title:String,
    description:String,
    price:Number,
    quantity:Number
})

const OrderSchema = new mongoose.Schema({
    user_email : String,
    userOrder : [CartSchema] ,
    ordersDate : Date          
})

const OrderModel = mongoose.model('orders', OrderSchema)

const CartModel = mongoose.model("cart", CartSchema)

module.exports = {CartModel,OrderModel}