const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const uniqueid =require("uniqueid");
const Order=require("../models/order");
const shortid=require('shortid');
const Razorpay=require('razorpay');
const bodyParser=require('body-parser');
var request = require('request');

const razorpay=new Razorpay({
  key_id:'rzp_test_Ni2qeZhQapTH7o',
  key_secret:'sDDWcbn9xpV8ycEd5bDoyMmx',
})
let user="";
let userCart;
exports.emptyCart = async (req, res) => {
    console.log("empty cart");
    const user = await User.findOne({ email: req.user.email }).exec();
  
    const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
    res.json(cart);
  };
exports.userCart = async (req, res) => {
    // console.log(req.body); // {cart: []}
    const { cart } = req.body;
  
    let products = [];
  
    const user = await User.findOne({ email: req.user.email }).exec();
  
    // check if cart with logged in user id already exist
    let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();
  
    if (cartExistByThisUser) {
      cartExistByThisUser.remove();
      console.log("removed old cart");
    }
  
    for (let i = 0; i < cart.length; i++) {
      let object = {};
  
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.dateofjourney=cart[i].dateofjourney;
      // get price for creating total
      let productFromDb = await Product.findById(cart[i]._id)
        .select("price")
        .exec();
      object.price = productFromDb.price;
  
      products.push(object);
    }
  
    // console.log('products', products)
  
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
  
    // console.log("cartTotal", cartTotal);
  
    let newCart = await new Cart({
      products,
      cartTotal,
      
      orderdBy: user._id,
    }).save();
  
    console.log("new cart ----> ", newCart);
    res.json({ ok: true });
  };
  
  exports.getUserCart = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec();
  
    let cart = await Cart.findOne({ orderdBy: user._id })
      .populate("products.product", "_id title price totalAfterDiscount")
      .exec();
  
    const { products, cartTotal, } = cart;
    res.json({ products, cartTotal });
  };
  exports.createOrder = async (req, res) => {
    const { COD,total} = req.body;
    // if COD is true, create order with status of Cash On Delivery
  
     user = await User.findOne({ email: req.user.email }).exec();
  
     userCart = await Cart.findOne({ orderdBy: user._id }).exec();


    const payment_capture=1;
    const amount =total*100;
    const currency="INR";
    const options = {
      amount: amount,
      currency,
      receipt: shortid.generate(),
      payment_capture
    }
    try {
      const response = await razorpay.orders.create(options)
      console.log(response)
      res.json(response);
    } catch (error) {
      console.log(error)
    }
    
  };  

  exports.createCashOrder = async (req, res) => {
    const { COD} = req.body;
    // if COD is true, create order with status of Cash On Delivery
  
    if (!COD) return res.status(400).send("Create cash order failed");
  
  
    
  
    
  
    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        // id: uniqueid(),
        // amount: userCart.cartTotal,
        // currency: "Rs.",
        // status: "Cash On Station",
        // created: Date.now(),
        // payment_method_types: ["cash"],
      //   amount: userCart.cartTotal,  // amount in the smallest currency unit
      //  currency: "INR",
      //  receipt: "order_rcptid_11"
      },
      orderdBy:user._id,
     
     
    }).populate('orderdBy')
    .populate('products.product').save();
  
    // decrement quantity, increment sold
    let bulkOption = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id }, // IMPORTANT item.product
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
  
    let updated = await Product.bulkWrite(bulkOption, {});
    console.log("PRODUCT QUANTITY-- AND SOLD++", updated);
  
    console.log("NEW ORDER SAVED", newOrder);
    res.json({ ok: true });
  };
  exports.getOrder= async(req,res)=>{
    let user= await User.findOne({email: req.user.email}).exec();
    let order=await Order.find({orderdBy:user.id}).populate("products.product orderdBy").exec();
    
    res.json(order);
  }

  exports.verification=async (req, res) => {
    // do a validation
    const secret = '051910'
  
    console.log(req.body)
  
    const crypto = require('crypto')
  
    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')
  
    console.log(digest, req.headers['x-razorpay-signature'])
  
    if (digest === req.headers['x-razorpay-signature']) {
      console.log('request is legit')
      // process it
      // require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
        
    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: req.body.payload.payment.entity.id ,
        amount:req.body.payload.payment.entity.amount/100 ,
        currency: "INR",
        status:req.body.payload.payment.entity.status ,
        created: Date.now(),
        payment_method_types:req.body.payload.payment.entity.method,
      },
      orderdBy:user._id,
     
     
    }).populate('orderdBy')
    .populate('products.product').save();
  
    // decrement quantity, increment sold
    let bulkOption = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id }, // IMPORTANT item.product
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
  
    let updated = await Product.bulkWrite(bulkOption, {});
    console.log("PRODUCT QUANTITY-- AND SOLD++", updated);
  
    console.log("NEW ORDER SAVED", newOrder);
    res.json({ ok: true });
    } else {
      // pass it
      console.log("verification failed");
    }
    res.json({ status: 'ok' })
  }

  exports.refund=async(req,res)=>{
   const {id,oid}=req.body;
   var body1;
   request({
    method: 'POST',
    url: `https://rzp_test_Ni2qeZhQapTH7o:sDDWcbn9xpV8ycEd5bDoyMmx@api.razorpay.com/v1/payments/${id}/refund`,
  }, function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
    if(response.statusCode===200){
       Order.findOneAndUpdate({_id:oid},{"paymentIntent.status":"canceled"}).exec();
       let bulkOption = userCart.products.map((item) => {
        return {
          updateOne: {
            filter: { _id: item.product._id }, // IMPORTANT item.product
            update: { $inc: { quantity: +item.count, sold: -item.count } },
          },
        };
      });
    
      let updated = Product.bulkWrite(bulkOption, {});

    }
  });
  res.json({ok:true});

  }