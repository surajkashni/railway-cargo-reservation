const express = require("express");

const router = express.Router();

const {
    userCart,
    
    addToWishlist,
    wishlist,
    removeFromWishlist,
    
    getOrder,
    refund,
    getUserCart,
    emptyCart,
    saveAddress,
    createOrder,
    applyCouponToUserCart,
    createCashOrder,
    verification,
  } = require("../controllers/user");

  const { authCheck } = require("../middlewares/auth");




  




router.post("/user/cart", authCheck, userCart); // save cart
router.get("/user/cart", authCheck, getUserCart); // get cart
router.post("/user/cash-order",authCheck,createCashOrder);
router.post("/user/order",authCheck,createOrder);
router.get("/user/orders",authCheck,getOrder);
router.post("/verification",verification);
router.delete("/user/cart", authCheck, emptyCart); // empty cart
router.post("/refund",authCheck,refund);

module.exports = router;