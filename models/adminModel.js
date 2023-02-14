import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Enter a valid email");
    },
    required: true,
  },
  password: {
    type: String,
    validate(value) {
      if (!validator.isStrongPassword(value))
        throw new Error("Enter Strong Password");
    },
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
  isAdmin: {
    type: Boolean,
  },
});

// adminSchema.methods.generateToken = async function(){
//     try {
//         const token = await jwt.sign({id:this._id,user:this},process.env.Secretkey,{
//             expiresIn:'2d'
//         })
//         // this.tokens = this.tokens.concat(token)
//         return token
//     } catch (error) {
//         res.status(501).json({message:error})
//     }
// }
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
