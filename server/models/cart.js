const mongoose=require("mongoose");

const {ObjectId}=mongoose.Schema;

const cartSchema= new mongoose.Schema({
    products:[
        {
           product:{
               type:ObjectId,
               ref:"Product"
           },
           count:Number,
           dateofjourney:String,
           
           
           price:Number,
        },
        
    ],
    cartTotal:Number,
    currency:{
        type:String,
        default:"INR"
    },
   
    orderdBy:{
        type:ObjectId,ref:"User"
    }
},{timestamps:true});

module.exports=mongoose.model("Cart",cartSchema);