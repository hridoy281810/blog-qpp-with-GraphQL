import { User } from "@prisma/client";
import { prisma } from "..";
import DataLoader from "dataloader";

export const batchUsers = async(ids:number[]):Promise<User[]>=>{
    //ids:[10,11,12,13]
    console.log(ids)
   const users = await prisma.user.findMany({
    where:{
        id:{
            in:ids
        }
    }
   })
   const userData:{[key:string] :User} ={}; 
   users.forEach((user)=>{
   userData[user.id] = user
   })
   return ids.map((id)=> userData[id])
};
// @ts-ignore 
export const userLoader = new DataLoader<number,User>(batchUsers)