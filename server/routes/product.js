const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { create, listall,remove,trainsBySD,update,list,productCount,productStar,listRelated,readoneid,readonename,readoneday,confirm,cancel} = require("../controllers/product");
const admin = require("firebase-admin");

// routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productCount);

router.get("/product/id/:slug", readoneid);
router.get("/product/day/:slug", readoneday);
router.get("/product/name/:slug", readonename);

router.get("/products",listall);
router.post('/trains',trainsBySD);

router.put('/product/:slug/confirm',confirm);
router.put('/product/:slug/cancel',cancel);


router.delete('/product/:slug',authCheck,adminCheck,remove);

module.exports = router;
