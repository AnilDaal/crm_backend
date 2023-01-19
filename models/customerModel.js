import mongoose from "mongoose"
const CustomerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String
    },
    phone:{
        type:Number,
    },
    country:{
        type:String
    },
    address:{
        type:String,
        required:true
    }
})
const Customer = mongoose.model("Customer",CustomerSchema)
export default  Customer