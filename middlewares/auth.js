import jwt from "jsonwebtoken"
const auth = (req,res,next)=>{
    try {
        let token = req.headers.authorization.split(" ")[1];
        if(token){
            let user = jwt.verify(token,process.env.Secretkey)
            // we define the user id property in req. function
            req.userId=user.id
        }
        else{
            return res.status(401).json({message:"unauthorized user"})
        }
        next()
    } catch (error) {
        res.status(502).json({message:error})
    }
}
export default auth