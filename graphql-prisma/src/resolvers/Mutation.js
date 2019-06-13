import uuidv4 from 'uuid/v4'

const Mutation = {
    createUser(parent, args, { prisma }, info) {
        const emailTaken = prisma.exists.User({ email: args.data.email })

        if (emailTaken) {
            throw new Error('Email taken')
        }

        return prisma.mutation.createUser({
            data: args.data
        }, info)
    },
    deleteUser(parent, args, { prisma }, info) {
        const userExists = prisma.exists.User({ id: args.id })
        if (!userExists) {
            throw new Error('User not found')
        }

        return prisma.mutation.deleteUser({
            where: {
                id: args.id
            }
        }, info)
    },
    updateUser(parent, args, { prisma }, info) {
        // We can not check if this user exists but we get a bad error message
        return prisma.mutation.updateUser({
            where: {
                id: args.id
            },
            data: args.data 
        }, info) 
    },
    createPost(parent, args, { prisma, pubsub }, info) {
        const userExists = prisma.exists.User({ id: args.data.id })

        if (!userExists) {
            throw new Error('User not found')
        }

        return prisma.mutation.createPost({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: args.data.author
                    }
                }
            }
        }, info)
    },
    deletePost(parent, args, { prisma, pubsub }, info) {
        const postExists = prisma.exists.Post({ id: args.id})

        if (!postExists) {
            throw new Error('Post not found')
        }

        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info)
    },
    updatePost(parent, args, { prisma, pubsub }, info) {
        const postExists = prisma.exists.Post({ id: args.id })

        if (!postExists) {
            throw new Error('Post not found')
        }

        return prisma.mutation.updatePost({
            data: args.data,
            where: {
                id: args.id
            }
        }, info)
    },
    createComment(parent, args, { prisma }, info) {
        return prisma.mutation.createComment({
            data: {
                text: args.data.text,
                author: {
                    connect: {
                        id: args.data.author
                    }
                },
                post: {
                    connect: {
                        id: args.data.post
                    }
                }
            }
        }, info)
    },
    deleteComment(parent, args, { prisma }, info) {
        return prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        }, info)
    },
    updateComment(parent, args, { prisma }, info) {
        return prisma.mutation.updateComment({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    }
}

export { Mutation as default }