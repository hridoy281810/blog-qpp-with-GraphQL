
import jwt from "jsonwebtoken"
require('dotenv').config()

export const generateToken = async(payload:{userId:number})=>{
    const token = jwt.sign({userId: payload.userId}, process.env.JWT_Secret as string ,{expiresIn:"1d"});
    return token
}
const getUserInfoFromToken = async(token:string)=>{
     try{
     const userData = jwt.verify(token,process.env.JWT_Secret as string) as {userId:number}
     return userData
     }catch(err){
console.log(err)
     }
}
export const jwtHelper = {
    generateToken,
    getUserInfoFromToken
}