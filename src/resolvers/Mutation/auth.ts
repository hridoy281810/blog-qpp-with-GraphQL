import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import { jwtHelper } from "../../utils/jwtHelper";
interface UserInfo {name:string, email:string, password:string,bio?:string}
 const prisma = new PrismaClient()
export const authResolvers = {
    signup:async (parent:any,args:UserInfo,context:any)=> {
        const isExist = await prisma.user.findFirst({
          where:{
            email: args.email
          }
        })
        if(isExist){
          return {
            userError: "already this email is registered!",
            token:null
          }
        }
        const hashedPassword = await bcrypt.hash(args.password,12)
  const newUser = await prisma.user.create({
  data :{
  name:args.name,
  email:args.email,
  password:hashedPassword
  
  }
       })
       if(args.bio){
         await prisma.profile.create({
          data:{
            bio:args?.bio,
            userId:newUser.id
          }
         })
       }
       const token = jwtHelper.generateToken({userId: newUser.id})
   return {
    userError:null,
    token
   }
      },
      signIn:async (parent:any,args:any,context:any)=> {
        // console.log(parent,args)
        const loginUser = await prisma.user.findFirst({
        where:{
          email:args.email
        }
        })
        if(!loginUser){
          return {
            userError:"user not found",
            token:null
          }
        }
  const correctPassword = await bcrypt.compare(args.password, loginUser?.password)
  if(!correctPassword){
  return {
    userError:"incorrect password",
    token:null
  }
  }
  const token = jwtHelper.generateToken({userId: loginUser.id})
  return {
  userError:null,
  token
  }
  },
}