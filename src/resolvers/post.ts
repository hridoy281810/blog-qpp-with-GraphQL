import { userLoader } from "../dataLoaders/userLoader"

export const Post = {
    author: async(parent:any,args:any,{prisma,userInfo}:any)=>{
        // console.log("parent=> ",parent,"args=> ",args,userInfo)
        return userLoader.load(parent.authorId)
    }
}