const router = require('express').Router();
const {PrismaClient}=require('@prisma/client');;
const prisma=new PrismaClient()
const {verifyToken}=require("../auth/user.auth")

router.post('/user',verifyToken,async(req,res)=>{
  const{title,content}=req.body
  console.log(req.userId)
  
  try {
    const user=await prisma.todo.create({
      data:{
        title,
        content,
        userId:req.userId
      }
    })
    res.status(201).send(user)

  } catch (error) {
    res.send(error.message)
    
  }

})

router.get("/user",verifyToken,async(req,res)=>{
  try {
    const userTodo=await prisma.todo.findMany({where:{userId:req.userId}})
    res.send(userTodo)
  } catch (error) {
    res.send(error.message)
    
  }
})

router.patch("/user/:todoId",verifyToken,async(req,res)=>{
  try {
    await prisma.todo.updateMany({where:{id:parseInt(req.params.todoId),userId:req.userId},data:req.body})
    res.send(`your info updated`)
  } catch (error) {
    res.send(error.message)
    
  }

})

router.delete("/user/:todoId",async(req,res)=>{
  try {
    await prisma.todo.delete({where:{id:parseInt(req.params.todoId)}})
    res.send(`your todo is deleted `)
  } catch (error) {
    res.send(error.message)
    
  }
})

module.exports=router
