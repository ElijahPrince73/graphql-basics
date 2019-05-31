import { GraphQLServer } from "graphql-yoga";

// 5 Scalar Types
// String, Boolean, Int, Float, ID,

const users = [
    {
        id: '1',
        name: 'g',
        email: '1@gmail.com',
        age: 21
    },
    {
        id: '2',
        name: 'name2',
        email: '2@gmail.com',
        age: 21
    },
    {
        id: '3',
        name: 'name3',
        email: '3@gmail.com',
        age: 21
    }
]

const posts = [
    {
        id: '1',
        title: 'A new hope',
        body: 'A good moview for sure',
        published: 1978
    },
    {
        id: '2',
        title: 'Jedi remix',
        body: 'A good moview for sure',
        published: 1979
    },
    {
        id: '1',
        title: 'Clone Wars',
        body: 'A good moview for sure',
        published: 2005
    },
]


// type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User]!
        posts(query: String): [Post]!
        me: User!
        post: Post!
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
        users(parent, args, ctx) {
            if(!args.query) {
                return users
            } else {
                return users.filter((user) => {
                    return user.name.toLowerCase().includes(args.query.toLowerCase())
                })
            }
        },
        posts(parent, args, ctx) {
            if(!args.query) {
                return posts
            } else {
                return posts.filter((post) => {
                    const titleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                    const bodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())

                    return titleMatch || bodyMatch
                })
            }
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