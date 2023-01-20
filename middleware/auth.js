const isLogin = (req,res,next)=>{
    try {
        if(req.session.user_id){
            res.redirect('/')
        }
        next()
    } catch (error) {
        
    }
}

const isLogout = (req,res)=>{
try {
    
} catch (error) {
    
}
}