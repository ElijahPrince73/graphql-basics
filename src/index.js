import { GraphQLServer } from "graphql-yoga";

// 5 Scalar Types
// String, Boolean, Int, Float, ID,


// type definitions (schema)
const typeDefs = `
    type Query {
        greeting(name: String!): String!
        me: User!
        post: Post!
        add(num1: Int, num2: Int): String!
    }

    type User {
        id: String!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: String,
        title: String,
        body: String,
        published: Boolean
    }
`

// resolvers
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info) {
            return 'Hello ' + args.name
        },
        add(parent, args, ctx, info){
            return args.num1 + args.num2
        },
        me() {
            return {
                id: '123',
                name: 'Named',
                email: 'test@gmail.com',
                age: 12
            }
        },
        post() {
            return {
                id: '123',
                title: 'Here is a title',
                body: 'Star wars leaked',
                published: true
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => console.log('started '))