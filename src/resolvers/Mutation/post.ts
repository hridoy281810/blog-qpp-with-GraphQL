import { checkUserAccess } from "../../utils/caheckUserAccess"

export const postResolvers = {
    addPost: async(parent:any,{post}:any,{userInfo,prisma}:any)=> {
        // console.log(post)
        if(!userInfo){
            return {
                userError: "Unauthorized",
                post:null
            }
        }
        if(!post.title || !post.content){
            return {
                userError: "Title and content is required!",
                post:null
            }  
        }
        const newPost = await prisma.post.create({
            data: {
                  title: post.title,
                  content: post.content,
                  authorId: userInfo.userId
            }
        })
        console.log(newPost,"new post")
        return {
            userError: null,
            post:newPost
        }
    },
    updatePost:async(parent:any,args:any,{userInfo,prisma}:any)=>{
        console.log(userInfo,'hello',args)
        const error = await checkUserAccess(prisma,userInfo.userId,args.postId)
        console.log(error)
        if(error){
            return error
        }

        const updatedPost = await prisma.post.update({
            where:{
                id: Number(args.postId)
            },
            data:args.post
        });
        return {
            userError: null,
            post:updatedPost
        }
    },
    deletePost:async(parent:any,args:any,{userInfo,prisma}:any)=>{
        console.log(userInfo,'hello',args)
        const error = await checkUserAccess(prisma,userInfo.userId,args.postId)
        console.log(error)
        if(error){
            return error
        }
        const deletedPost = await prisma.post.delete({
            where:{
                id: Number(args.postId)
            }
        });
        return {
            userError: null,
            post:deletedPost
        }
    },
    publishedPost:async(parent:any,args:any,{userInfo,prisma}:any)=>{
        console.log(userInfo,'hello',args)
        const error = await checkUserAccess(prisma,userInfo.userId,args.postId)
        console.log(error)
        if(error){
            return error
        }

        const publishPost = await prisma.post.update({
            where:{
                id: Number(args.postId)
            },
            data:{
              published:true
            }
        });
        return {
            userError: null,
            post:publishPost
        }
    },
   }