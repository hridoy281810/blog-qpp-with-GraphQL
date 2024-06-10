
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from '@prisma/client/runtime/library';
import { jwtHelper } from './utils/jwtHelper';
interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userInfo: {
    userId: number | null;
  } | null
}
const prisma = new PrismaClient()
const main =async()=>{
    const server = new ApolloServer({
        typeDefs,
        resolvers,
      });
      const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context:async ({req}):Promise<Context>=>{
        const userInfo = await jwtHelper.getUserInfoFromToken(req.headers.authorization as string) 
        // console.log(userInfo,'proble')
        return {
            prisma,
            userInfo: userInfo ? { userId: userInfo.userId } : { userId: null }
          }

        }
      });
      
      console.log(`🚀  Server ready at: ${url}`);
}
main()
