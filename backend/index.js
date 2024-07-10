const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./model/UserRegister");
const { CartModel, OrderModel } = require("./model/CartOrders");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/UserManagement");

// 1. Register User(insert user)
app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.send(users))
    .catch((err) => res.send(err));
});

// 2. Login User
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Email", email);
  UserModel.findOne({ email: email }).then((users) => {
    if (users) {
      if (users.password === password) {
        res.send(users.email);
      } else {
        res.send("No Record Existed");
      }
    }
  });
});

// 3. AddToCart (Insert to ShoppingCart)
app.post("/addtocart", (req, res) => {
  console.log("Add to Cart", req.body);
  const Cart = new CartModel(req.body);
  Cart.save()
    .then((cart) => res.send(cart))
    .catch((err) => res.send(err));
});

app.post("/showcart", (req, res) => {
  CartModel.find({ user_email: req.body.email })
    .then((cartData) => {
      res.send(cartData);
    })
    .catch((err) => console.log(err));
});


app.put("/updateCart/:id", (req, res) => {
  CartModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  )
    .then((x) => res.send(x))
    .catch((err) => console.log(err.message));
});

//  4.DeleteItemFromShoppingCart (DeleteOne)
app.delete("/deleteCart/:id", async (req, res) => {
  try {

      const deletedProduct = await CartModel.findOneAndDelete({
        _id: req.params.id,

      })

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/deleteCart", async (req, res) => {
  try {

      const deletedProduct = await mongoose.connection.db.collection('carts').deleteMany({'user_email' : req.body.userEmail})
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});



app.post("/showOrder", async (req, res) => {
  try {
    const showOrd = await mongoose.connection.db.collection('orders').find({ user_email: req.body.userEmail }).toArray();

    if (showOrd.length === 0) {
      return res.status(404).send({ message: "No orders found for this user" });
    }

    return res.status(200).send(showOrd);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.post("/addOrder", (req, res) => {
  const userData = {
    user_email: req.body.userEmail,
    userOrder: req.body.order,
    ordersDate : Date.now()
  };

  const Cart = new OrderModel(userData);
  Cart.save()
    .then((cart) => res.send(cart))
    .catch((err) => res.send(err));
});

app.listen(3001, () => {
  console.log("Server is Running!!!!!!!!!!");
});
