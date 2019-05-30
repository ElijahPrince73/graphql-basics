import { GraphQLServer } from "graphql-yoga";

// 5 Scalar Types
// String, Bool, Int, Float, ID,


// type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String
    }
`

// resolvers
const resolvers = {
    Query: {
        hello() {
            return 'This is my first query'
        },
        name() {
            return 'Eli'
        },
        location() {
            return 'Las Vegas'
        },
        bio() {
            return 'Just a dude playing another dude'
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => console.log('started '))