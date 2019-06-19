import { GraphQLServer, PubSub } from 'graphql-yoga'
import User from './resolvers/User'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import prisma from './prisma'

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User
    },
    context(request) {
        return {
            pubsub,
            prisma,
            request
        }
    }
})

server.start(() => {
    console.log('The server is up!')
})