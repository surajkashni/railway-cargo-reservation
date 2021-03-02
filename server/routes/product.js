const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { create, listall,remove,read,update,list,productCount,productStar,listRelated,readone,confirm,cancel} = require("../controllers/product");

// routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productCount);

router.get("/product/:slug", readone);
router.get("/product", read);
router.put('/product/:slug/confirm',confirm);
router.put('/product/:slug/cancel',cancel);

router.get("/product/related/:productId",listRelated);
router.put(`/product/:slug`,authCheck,adminCheck,update);
router.put(`/product/star/:productId`,authCheck,productStar);
router.delete('/product/:slug',authCheck,adminCheck,remove);
router.post(`/products`,list);

module.exports = router;
