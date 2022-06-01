import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs'
import resolvers from './resolvers';
import { cosmosDataSources, inMemoryDataSources } from "./data/index";

const typeDefs = readFileSync('../../graphql/schema.graphql', 'utf8')
/*
const resolvers: Resolvers = {
    // "Query" is somehow required by GraphQL definition
    Query: {
        
    }
}*/

//const server = new ApolloServer({ typeDefs, resolvers })

const server = new ApolloServer({
    typeDefs,
    resolvers ,
    dataSources: cosmosDataSources
  });

// The `listen` method launches a web server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})