import mongoose from "mongoose";

const produtSchema=new mongoose.Schema({
    name:{type:String,require:true},
    description:{type:String,require:true},
    price:{type:Number,require:true},
    category:{type:String,require:true},
    subCategory:{type:String,require:true},
    image:{type:Array,require:true},
    size:{type:Array,require:true},
    date:{type:Number,require:true},
    bestSeller:{type:Boolean}
})

const productModel=mongoose.model.product||mongoose.model('product',produtSchema)
export default productModel;