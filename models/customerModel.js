import mongoose from "mongoose"
const CustomerSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String
    },
    phone:{
        type:String,
        validate(value){
            if(value<1)
            throw new Error("Enter positive age")
        }
    },
    country:{
        type:String
    },
    address:{
        type:String
    }
})
const Customer = mongoose.model("Customer",CustomerSchema)
export default  Customer