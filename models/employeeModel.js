import mongoose from "mongoose"
// import bcrypt from "bcrypt"
import validator from "validator"
const EmploySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true 
    },
    email:{
        type:String,
        unique: [true,"enter unique email"],
        validate:{
            validator:function(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a valid Email")
            }
        },
        required:true
    }
    },
    phone:{
        type:String,
        validate(value){
            if(!validator.isMobilePhone(value,['en-IN','de-DE',]))
            throw new Error("enter valid length phone number")
        },
        required:true
    },
    password:{
        type:String,
        validate(value){
            if(!validator.isStrongPassword(value))
            throw new Error("enter strong password")
        },
        required:true
    },
    role:{
        type:String,
        enum:["Operation","Sales","Account"],
        required:true
    },
    address:{
        type:String,
        required:true
    },
    country:{
        type:String,
        enum:["India","UK","Germany","Dubai","USA"],
        required:true
    },
    tokens:[{
        token:{type:String}
    }],
    isAdmin:{
        type:Boolean,
        required:true
    }
})
// EmploySchema.pre("save",async function(next){
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password,salt)
//     // this.address = undefined
//     next()
// })

// schema.methods.setPassword = function setPassword (pwd, confirm) {
//     if (pwd === confirm) {
//       this.password = pwd;
//       return true;
//     } else {
//       this.invalidate('password', new Error('Password mismatch'));
//       return false;
//        }}

const Employee = mongoose.model("Employee",EmploySchema)
export default Employee
