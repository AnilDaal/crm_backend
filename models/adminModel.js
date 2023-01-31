import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const adminSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    tokens:[{
        token:{
            type:String
        }
    }]
})

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
const Admin = mongoose.model("Admin",adminSchema)
export default Admin