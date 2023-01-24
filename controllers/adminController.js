import Admin from "../models/adminModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const adminLogin = async (req,res)=>{
    const {email,password} = req.body
    try {
        const adminData = await Admin.findOne({email})
        if(!adminData){
            return res.status(404).json({message:"wrong user"})
        }  
        const hashPassword = await bcrypt.compare(password, adminData.password)
        if(!hashPassword)
        return res.status(404).json({message:"password wrong"})

        // token generate
        const token = await jwt.sign({id:adminData._id},process.env.Secretkey)
        res.status(201).json({token:token})
    } catch (error) {
      res.status(501).json({message:error})
    }
}
const adminSignup = async (req,res)=>{
    const {name,email,password} = req.body
    try {
        const existedAdmin = await Admin.findOne({email})
        if(existedAdmin){
            return res.status(401).json({message:"all ready user existed"})
        }
    const salt  = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password,salt)
    const adminData = await Admin.create({
        name,
        email,
        password:passwordHash
    })
    const token = await jwt.sign({id: adminData._id},process.env.Secretkey)
    res.status(201).json(token)
} catch (error) {
        res.status(501).json({message:error})
}
}


export default {adminLogin ,adminSignup}