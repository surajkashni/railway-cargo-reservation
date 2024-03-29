const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    id: {
      type:String,
      required:true,
      unique:true,
      index:true
      
    },
    slug: {
      type: String,      
      lowercase: true,
     
    },
    // description: {
    //   type: String,
    //   required: true,
    //   maxlength: 2000,
    //   text: true,
    // },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: String,
    // subs: [
    //   {
    //     type: ObjectId,
    //     ref: "Sub",
    //   },
    // ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    source:String ,
    destination:String,
    day1:String,
    day2:String,
    
      
    // images: {
    //   type: Array,
    // },
    // shipping: {
    //   type: String,
    //   enum: ["Yes", "No"],
    // },
    // color: {
    //   type: String,
    //   enum: ["Black", "Brown", "Silver", "White", "Blue"],
    // },
    // brand: {
    //   type: String,
    //   enum: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    // },
    // ratings: [
    //   {
    //     star: Number,
    //     postedBy: { type: ObjectId, ref: "User" },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
