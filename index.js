import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFiles } from "@graphql-tools/load-files";
import { mergedResolvers } from './graphql/resolvers/mergedResolvers.js'
import { prisma } from "./prisma/db.js";

const server = new ApolloServer({
    typeDefs: await loadFiles('./graphql/typeDefs/**/*.graphql'),
    resolvers: mergedResolvers
})
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

// const app = express();
// app.use('/graphql', cors({
//     origin: '*'
// }), express.json(), expressMiddleware(server));
// await prisma.user.create({
//     data: {
//         email: 'ariadne@prisma.io',
//         username: 'Ariadne',
//         password: '123456'
//     },
// })
// const users = await prisma.user.findMany()
// console.log({ ...users })
console.log(`server started on port: ${url}`)
console.log(`server started on port: ${process.env.DATABASE_URL}`)


