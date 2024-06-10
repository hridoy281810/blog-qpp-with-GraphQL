
export const checkUserAccess = async(prisma:any,userId:any,postId: any)=>{

const user = await prisma.user.findUnique({
    where:{
        id:userId
    }
})

console.log(user,"user 1")
if(!user){
    return {
        userError: "user not found!",
        post:null
    }
}

const myPost = await prisma.post.findUnique({
    where: {
        id:Number(postId)
    }
})
console.log(myPost,'my post')
if(!myPost){
    return {
        userError: "post not found!",
        post:null
    }
}
if(myPost.authorId !== user.id ){
return {
    userError: "post not owned by user!",
    post:null
}
}
}