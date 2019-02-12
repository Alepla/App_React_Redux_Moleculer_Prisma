const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
     Query: {
        messages(root, args, context) {
            return context.prisma.messages()
        }
    },
    Mutation: {
        createMessage(root, args, context) {
            return context.prisma.createmessage(
                { 
                    content: args.data.content,
                    author: args.data.author
                }
            )
        }
    }, 
    Subscription: {
        messageSubs: {
            subscribe: async (parent, args, context, info) => {
                return context.prisma.$subscribe.message({
                    mutation_in: ['CREATED', 'UPDATED']
                }).node()
            },
            resolve: payload => {
                console.log(payload);
                return payload
            },
        },
    },
}

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: {
        prisma,
    },
})
server.start(() => console.log('Server is running on http://localhost:4000'))