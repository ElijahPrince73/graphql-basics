import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists


// prisma.exists.Comment({
//     id: "cjwk6174c00up073138fodytb"
// })
// .then((res) => {
//     console.log(res)
// }).catch((err) => {
    
// });

const createPostForUser = async (authorId, data) => {
    const userExist = await prisma.exists.User({
        id: authorId
    })

    if(!userExist){
        throw new Error('No User Found')
    }

    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ author { id name email posts { id title published }}  }')
    return post.author
}

// createPostForUser('cjwk4elo900a5073170nzbf2n', {
//     title: 'Great books to read',
//     body: 'The War of Art',
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// })

const updatePostForUser = async (postId, data) => {
    const postExist = await prisma.exists.Post({
        id: postId
    })
    
    if (!postExist) {
        throw new Error('No Post Found')
    }
    
    const post = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data
    }, '{ author { id name email posts { id title published } } } ')
    return post.author
}

updatePostForUser("cjwlmd8ns01e407311e3zfv1t", { published: false }).then((user) => {
    console.log(JSON.stringify(user, undefined, 2))
})
.catch((e) => console.log(e))