"use strict";
const jwt = require("jsonwebtoken");
const { prisma } = require('../resources/src/generated/prisma-client');

module.exports = {
    name: "chat",
    /**
	 * Default settings
	 */
    settings: {
        /** Secret for JWT */
        JWT_SECRET: process.env.JWT_SECRET || "jwt-conduit-secret",
    },
    actions: {
        listMessages: {
            async handler(ctx) {
                const query = `
                    query messages {
                        messages(orderBy: createdAt_ASC) {
                            id
                            createdAt
                            updatedAt
                            author
                            content
                        }
                    }
                `;
                const messages = await prisma.$graphql(query);
                return messages;
            }
        },
        sendMessage: {
            params: {
                data: {
                    type: "object", props: {
                        author: { type: "string" },
                        message: { type: "string" }
                    }
                }
            },
            async handler(ctx) {
                const mutation = `
                    mutation createMessage($data: messageCreateInput!){
                        createmessage(data: $data){
                            id
                            author
                            content
                        }
                    }`
                ;
                const variables = {
                    data: {
                        author: ctx.params.data.author,
                        content: ctx.params.data.message
                    }
                };
                const message = await prisma.$graphql(mutation, variables);
                return message;
            }
        }
    }
}