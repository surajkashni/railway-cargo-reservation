const Product = require("../models/product");
const User=require('../models/user');
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listall = async (req, res) => {
  let products = await Product.find({})
  .limit(parseInt(req.params.count))
  .populate("category")
  .populate("subs")
  .sort([["craetedAt","desc"]])
  .exec();
  res.json(products);
};


exports.remove=async(req,res)=>{
try{
  const deleted= await Product.findOneAndDelete({slug:req.params.slug}).exec();
  res.json(deleted);
}
catch(err){
  console.log(err);
  return res.status(400).send('Product Delete Failed');
}

}

exports.read=async(req,res)=>{
 const rails= await Product.find({$and:[{source:req.body.source},{destination:req.body.destination}]}).exec();
// const rails=await Product.find({source:req.body.source}).exec();
 res.json(rails);
}
exports.confirm=async(req,res)=>{
 const rails=await Product.findOneAndUpdate({slug:req.params.slug},{$inc:{sold:(req.body.quantity)},$inc:{quantity:-(req.body.quantity)}},{new:true}).exec();
 await rails.updateOne({$inc:{sold:req.body.quantity}},{new:true}).exec();

res.json(rails);
}
 exports.readone=async(req,res)=>{
  const rails=await Product.find({slug:req.params.slug}).exec();
   res.json(rails);
  }
  exports.cancel=async(req,res)=>{
    const rails=await Product.findOneAndUpdate({slug:req.params.slug},{$inc:{quantity:(req.body.quantity)}},{new:true}).exec();
    await rails.updateOne({$inc:{sold:-(req.body.quantity)}},{new:true}).exec();
   
   res.json(rails);
   
    }
exports.update=async(req,res)=>{
  try{
    if(req.body.title){
      req.body.slug = slugify(req.body.title);

    }
    const updated=await Product.findOneAndUpdate({slug:req.params.slug},req.body,{new:true}).exec();
     res.json(updated);
  }
  catch(err){
    console.log("product updation errr",err);
    
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }
  
}
//withot pagination
// exports.list=async (req,res)=>{
//   try{
//     const {sort,order,limit}=req.body;
//     const products= await Product.find({})
//     .populate("category")
//     .populate("subs")
//     .sort([[sort,order]])
//     .limit(3)
//     .exec();
//     res.json(products);

//   }catch(err){
//     console.log(err);
//   }
  
// }
exports.list=async (req,res)=>{
  try{
    const {sort,order,page}=req.body;
    const currentPage=page||1;
    const perPage=3;
    const products= await Product.find({})
    .skip((currentPage-1)*perPage)
    .populate("category")
    .populate("subs")
    .sort([[sort,order]])
    .limit(perPage)
    .exec();
    res.json(products);

  }catch(err){
    console.log(err);
  }
  
}

exports.productCount=async (req,res)=>{
  const total=await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
}

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  // who is updating?
  // check if currently logged in user have already added rating to this product?
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    // if user have already left rating, update it
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    console.log("ratingUpdated", ratingUpdated);
    res.json(ratingUpdated);
  }
};

exports.listRelated=async(req,res)=>{
  const product= await Product.findById(req.params.productId).exec();
  const related=await  Product.find({
    _id:{$ne:product._id},
    category:product.category,
  }).limit(3)
  .populate('category')
  .populate('subs')
  .populate('postedBy')
  .exec();

  res.json(related);
}