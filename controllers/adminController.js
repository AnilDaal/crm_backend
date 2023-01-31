import Admin from "../models/adminModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const adminLogin = async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password)
    return res.status(401).json({message:"Enter email and password"})
    try {
        //for updating data we are using admin values
        const adminData = await Admin.findOne({email})
        if(!adminData){
            return res.status(404).json({message:"wrong user"})
        }  
        const hashPassword = await bcrypt.compare(password, adminData.password)
        if(!hashPassword)
        return res.status(404).json({message:"password wrong"})
        // token generate
        // const token = await adminData.generateToken()
        // const adminId = adminData._id
        const token = await jwt.sign({id:adminData._id,user:adminData},process.env.Secretkey,{expiresIn:'2d'})
        // await adminData.updateOne({$push:{
        //     tokens:{
        //         $each:[{token:token}]}}},{new:true})
        // res.cookie("CRM_Admin",token,{expires:new Date(Date.now()+1000*3600),httpOnly:true})
        res.status(201).json(token)
    } catch (error) {
      res.status(501).json({message:error})
    }
}

const adminLogout = async (req,res)=>{
    try{
    req.admin.tokens = await req.admin.tokens.filter((elem)=>{
        return elem.token != req.adminId
    })
    // await req.admin.save()
    // res.clearCookie("CRM_Admin")
    res.status(201).json({message:"logout done.."}).end()
}
 catch(error) {
    res.status(502).json({message:error})
}
}
const adminSignup = async (req,res)=>{
    const {name,email,password,isAdmin} = req.body
    if(!name || !email || !password )
    return res.status(401).json({message:"Please fill mandatory field"})
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
        isAdmin,
        password:passwordHash
    })
    // const token = await jwt.sign({id: adminData._id},process.env.Secretkey)
    res.status(201).json(adminData)
} catch (error) {
        res.status(501).json({message:error})
}
}

// const getAdmin = async(req,res)=>{
//     try {
//         const adminData = await Admin.find({})
//         res.status(201).json(adminData)
//     } catch (error) {
//         res.status(501).json(error)
//     }
// }

export default {adminLogin ,adminLogout ,adminSignup}