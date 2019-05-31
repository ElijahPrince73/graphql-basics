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
        published: 1978,
        author: '1',
        comment: '1234' 
    },
    {
        id: '2',
        title: 'Jedi remix',
        body: 'A good moview for sure',
        published: 1979,
        author: '2',
        comment: '555'
    },
    {
        id: '1',
        title: 'Clone Wars',
        body: 'A good moview for sure',
        published: 2005,
        author: '3',
        comment: '1255'
    },
]

const comments = [
    {
        id: '1234',
        text: 'Just a comment about star wars',
        author: '1',
        post: '1'
    },
    {
        id: '555',
        text: 'Just a comment about star wars the clone wars and how its aight',
        author: '2',
        post: '2'
    },
    {
        id: '1255',
        text: 'Jedi remix not good',
        author: '3',
        post: '1'
    },
]


// type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User]!
        posts(query: String): [Post]!
        post: Post!
        comments: [ Comment!]!
        comment: Comment!
    }

    type User {
        id: String!
        name: String!
        email: String!
        age: Int
        posts: Post!
        comments: Comment!
    }

    type Post {
        id: String,
        title: String,
        body: String,
        published: Boolean
        author: User!
        comments: Comment!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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
        post() {
            return {
                id: '123',
                title: 'Here is a title',
                body: 'Star wars leaked',
                published: true
            }
        },
        comments() {
            return comments
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    },
    Post: {
        comments(parent) {
            return comments.find((comment) => {
                return comment.id === parent.comment
            })
        }
    },
    User: {
        posts(parent, args, ctx) {
            return posts.find((post) => {
                return post.author === parent.id
            })
        }
    },
    User: {
        comments(parent) {
            return comments.find((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent) {
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    },
    Comment: {
        post(parent) {
            return posts.find((post) => {
                return post.id === parent.post
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => console.log('started '))