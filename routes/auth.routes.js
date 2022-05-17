const router = require('express').Router();
const {PrismaClient}=require('@prisma/client')
const prisma=new PrismaClient()
const bcrypt=require("bcrypt")
const {generateToken,verifyToken}=require("../auth/user.auth")


router.post('/user', async (req, res, next) => {
  try {
    const {name,email,password}=req.body
    console.log(req.body)
    const encrypted=await bcrypt.hash(password,10)
    const user= await prisma.user.create({
      data:{
        name,
        email,
        password:encrypted

    }})
    res.send("your registerd ")

  } catch (error) {
    res.send(error.message)
    
  }
 
});

router.get("/user",async(req,res)=>{
  const {email,password}=req.body
  try {
    const user=await prisma.user.findUnique({where:{email}})
    const isPasswordmatch=await bcrypt.compare(password,user.password)
    if (isPasswordmatch){
      const token=generateToken(user)
      res.cookie("authToken",token)
      res.send("your logged in succsessfuly")
    }
  } catch (error) {
    res.send(error.message)
    
  }
  

})


router.get("/user/logout",async(req,res)=>{
  res.clearCookie("authToken").send("your logged out ")

})
module.exports = router;