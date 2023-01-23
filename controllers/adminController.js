import Admin from "../models/adminModel.js"

const adminLogin = async (req,res)=>{
    const {email,password} = req.body
    try {
        const adminData = await Admin.findOne({email})
        if(!adminData){
            res.status(404).json({message:"wrong user"})
        }  
        if(!password===adminData.password){
            res.status(404).json({message:"wrong password"})
        }
        res.status(200).json({email:adminData.email,password:adminData.password})
    } catch (error) {
        console.log(error);
    }
}

export default  {
     adminLogin 
}