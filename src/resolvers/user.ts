export const User = {
    posts: async(parent:any,args:any,{prisma,userInfo}:any)=>{
        // console.log("parent=> ",parent,"args=> ",args,userInfo)
        const isMyProfile = parent.id === userInfo.userId
    if(isMyProfile){
       return await prisma.post.findMany({
            where:{
                authorId:parent.id
            }
        })
    }
  else{
    return await prisma.post.findMany({
        where:{
            authorId:parent.id,
            published:true
        }
    })
  }
    }
}