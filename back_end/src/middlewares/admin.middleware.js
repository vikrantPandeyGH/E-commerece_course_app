import jwt from 'jsonwebtoken'

export const adminAuthMiddleware = (req,res,next)=>{
    try{
        const {adminToken} = req.cookies
    if(!adminToken){
        return res.status(401).json({
            message:'unauthenticated admin access'
        })
    }
    const decoded = jwt.verify(adminToken,process.env.JWT_ADMIN_SECRET)
    req.admin = decoded
    next()
    }
    catch(err){
        return res.status(401).json({
            message:'invalid admin token'
        })
    }
}