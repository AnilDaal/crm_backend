import jwt from "jsonwebtoken"
const Secretkey = "anil"
const auth = (req,res,next)=>{
    try {
        let token = req.headers.authorization.split(" ")[1];
        if(token){
            let user = jwt.verify(token,Secretkey)
            // we define the user id property in req. function
            req.userId=user.id
        }
        else{
            res.status(401).json({message:"unauthorized user"})
        }
        next()
    } catch (error) {
        console.log(error.message);
        res.status(401).json({message:"invailid user"})

    }
}
export default auth