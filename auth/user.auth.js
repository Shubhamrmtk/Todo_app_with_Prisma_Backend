const jwt=require("jsonwebtoken")
exports.generateToken=({id})=>{
  return jwt.sign(id,"shubham")
}

exports.verifyToken=async(req,res,next)=>{
  const cookie=req.headers.cookie
  if (cookie){
    const token=cookie.split('=')[1]
    const id=parseInt(jwt.verify(token,"shubham"))
    req.userId=id
    next()
  }else{
    res.send("please login")
  }
  
}








