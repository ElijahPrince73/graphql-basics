import getUserId from '../utils/getUserId'

const Query = {
    users(parent, args, { prisma }, info) {
        const opArgs = {}
        if(args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
        }
        return prisma.query.users(opArgs, info)
    },
    async myPosts(parent, args, { prisma, request }, info){
        const userId = getUserId(request)

        const opArgs = {
            where: {
                author: {
                    id: userId
                }
            }
        }
        if (args.query) {
            opArgs.where.OR = [{
                title_contains: args.query,
            }, {
                body_contains: args.query
            }]
        }

        const posts = await prisma.query.posts(opArgs, info)

        return posts
    },
    posts(parent, args, { prisma }, info) {
        const opArgs = {
            where: {
                published: true
            }
        }

        if(args.query) {
            opArgs.where.OR = [{
                title_contains: args.query,
            }, {
                body_contains: args.query
            }]
        }
        return prisma.query.posts(opArgs, info)
    },
    comments(parent, args, { prisma }, info) {
        const opArgs = {}
        if (args.query) {
            opArgs.where = {
                OR: [{
                    text_contains: args.query,
                }, {
                    id_contains: args.query
                }]
            }
        }

        return prisma.query.comments(opArgs, info)
    },
    async me(parent, args, {prisma, request}, info) {
        const userId = getUserId(request)

       const user =  await prisma.query.user({
            where: {
                id: userId
            }
        }, info)

        return user
    },
    async post(parent, args, { prisma, request }, info) {
        const userId = getUserId(request, false)
        
        const posts = await prisma.query.posts({
            where: {
                id: args.id,
                OR: [{
                    published: true
                }, {
                    author: {
                        id: userId
                    }
                }]
            }
        }, info)

        if(posts.length === 0) {
            throw new Error('Post not found')
        }

        return posts[0]
    }
}

export { Query as default }