import mongoose from "mongoose"
import bcrypt from "bcrypt"
import validator from "validator"
const EmploySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        unique: [true,"enter unique email"],
        validate:{
            validator:function(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a valid Email")
            }
        }
    }
    },
    phone:{
        type:String,
        validate(value){
            if(!validator.isMobilePhone(value,['en-IN','de-DE']))
            throw new Error("enter valid length phone number")
        }
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:["Operation","Sales","Account"]
    },
    address:{
        type:String,
    },
    country:{
        type:String,
        enum:["India","UK","Germany","Dubai"]
    },
    tokens:[{
        token:{type:String}
    }]    
})
// EmploySchema.pre("save",async function(next){
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password,salt)
//     // this.address = undefined
//     next()
// })
const Employee = mongoose.model("Employee",EmploySchema)
export default Employee
