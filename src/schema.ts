export const typeDefs = `
type Query {
    me:User
    users:[User]
    posts:[Post]
    profile(userId:ID!):Profile
}  
type Mutation {
  signup(name:String!,
    email:String!,
    password:String!
    bio:String
  ):AuthPayload,
signIn(
  email:String
  password:String
):AuthPayload
 addPost(post:PostInput!):PostPayload
 updatePost(postId:ID!,post:PostInput!):PostPayload
 deletePost(postId:ID!):PostPayload
 publishedPost(postId:ID!):PostPayload
}
type PostPayload {
  userError:String
  post:Post
}
type AuthPayload{
  userError: String
  token:String
}
   type Post {
        id: ID!
        title: String!
        content: String!
        author: User
        createdAt: String!
        published: Boolean!
    }
  type User {
   id:ID!
   name:String!
   email:String!
   password:String!
   createAt: String!
   posts: [Post]
   profile:Profile
  }
  type Profile {
    id:ID!
    bio:String!
    createAt:String!
    user:User!
  }
  input PostInput {
  title:String
   content:String 
  }
`;
