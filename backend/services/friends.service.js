"use strict";
const jwt 			= require("jsonwebtoken");
const { prisma } = require('../resources/src/generated/prisma-client');

module.exports = {
    name: "friends",
    /**
	 * Default settings
	 */
	settings: {
		/** Secret for JWT */
		JWT_SECRET: process.env.JWT_SECRET || "jwt-conduit-secret",
	},
    actions: {
        listMyFriends: {
			params: {
                userID: { type: "string" }
			},
			async handler(ctx) {
				const query = `
                    query user($data: userWhereUniqueInput!){
                        user(where: $data){
                            friends{
                                id
                                username
                                name
                                lastName
                                bio
                                image
                            }
                        }
                    }`;
                const variables = { data: { id: ctx.params.userID } };
				const MyFriends = await prisma.$graphql(query, variables);
				return MyFriends;
			}
        }
    }
}