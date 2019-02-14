"use strict";

const { MoleculerClientError } = require("moleculer").Errors;

//const crypto 		= require("crypto");
const bcrypt 		= require("bcrypt");
const jwt 			= require("jsonwebtoken");

//const DbService = require("../mixins/db.mixin");

const { prisma } = require('../resources/src/generated/prisma-client');

module.exports = {
	name: "users",
	//mixins: [DbService("users")],

	/**
	 * Default settings
	 */
	settings: {
		/** Secret for JWT */
		JWT_SECRET: process.env.JWT_SECRET || "jwt-conduit-secret",

		/** Public fields */
		fields: ["_id", "username", "email", "bio", "image"],

		/** Validator schema for entity */
		entityValidator: {
			username: { type: "string", min: 2, pattern: /^[a-zA-Z0-9]+$/ },
			password: { type: "string", min: 6 },
			email: { type: "email" },
			bio: { type: "string", optional: true },
			image: { type: "string", optional: true },
		}
	},

	/**
	 * Actions
	 */
	actions: {
		/**
		 * Register a new user
		 * 
		 * @actions
		 * @param {Object} user - User entity
		 * 
		 * @returns {Object} Created entity & token
		 */
		create: {
			params: {
				user: { 
					type: "object", 
					props: {
						username: { type: "string", min: 3, optional: false, pattern: /^[0-9A-Za-z]{3,22}$/ },
						password: { type: "string", min: 6, optional: false, pattern: /^[0-9A-Za-z]{6,32}$/ },
						email: { type: "email", optional: false, pattern: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/ }
					}
				}
			},		
			async handler(ctx) {
				const { email } = ctx.params.user;

				const query = `
					query user($where: userWhereUniqueInput!) {
						user(where: $where) {
					  		id
					  		username
					  		email
						}
				  	}`
				;
				const variables = { where: { email: email } };
				await prisma.$graphql(query, variables).then(user => {
					if(user.user) {
						if (user.user.email)
							return this.Promise.reject(new MoleculerClientError("Email is already in use!", 422, "", [{ field: "email", message: "Email is already in use!"}]));
						if (user.user.username)
							return this.Promise.reject(new MoleculerClientError("Username is already in use!", 422, "", [{ field: "email", message: "Username is already in use!"}]));
					}
				})

				let password_base64 = bcrypt.hashSync(ctx.params.user.password, 10);
				const mutation = `
					mutation users($data: userCreateInput!){
						createuser(data: $data){
							id
							username
							email
						}
					}`
				;
				const variables2 = {
					data: {
						username: ctx.params.user.username,
						password: password_base64,
						email: ctx.params.user.email
					}
				};
				const create = await prisma.$graphql(mutation, variables2);
				return this.transformEntity(create.createuser, true, ctx.meta.token);
			}
		},

		/**
		 * Login with username & password
		 * 
		 * @actions
		 * @param {Object} user - User credentials
		 * 
		 * @returns {Object} Logged in user with token
		 */
		login: {
			params: {
				user: {
					type: "object", 
					props: {
						email: { type: "email", optional: false, pattern: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/ },
						password: { type: "string", min: 6, optional: false, pattern: /^[0-9A-Za-z]{6,32}$/ }
					}
				}
			},
			handler(ctx) {
				const { email, password } = ctx.params.user;

				const query = `
					query user($where: userWhereUniqueInput!) {
						user(where: $where) {
					  		id
					  		username
					  		password
					  		email
						}
				  	}`
				;
				const variables = { where: { email: email } };
				return prisma.$graphql(query, variables).then(user => {
					if (user.user === null)
						return this.Promise.reject(new MoleculerClientError("Email or password is invalid!", 422, "", [{ field: "email", message: "Email or password is invalid!"}]));

					return bcrypt.compare(password, user.user.password).then(res => {
						if (!res)
							return Promise.reject(new MoleculerClientError("Wrong password!", 422, "", [{ field: "email", message: "Wrong password!"}]));
						
						return this.transformEntity(user.user, true, ctx.meta.token);
					});
				})
			}
		},

		/**
		 * Get user by JWT token (for API GW authentication)
		 * 
		 * @actions
		 * @param {String} token - JWT token
		 * 
		 * @returns {Object} Resolved user
		 */
		resolveToken: {
			cache: {
				keys: ["token"],
				ttl: 60 * 60 // 1 hour
			},			
			params: {
				token: "string"
			},
			handler(ctx) {
				return new this.Promise((resolve, reject) => {
					jwt.verify(ctx.params.token, this.settings.JWT_SECRET, (err, decoded) => {
						if (err)
							return reject(err);

						resolve(decoded);
					});

				})
					.then(decoded => {
						if (decoded.id) {
							const query = `
								query users($where: userWhereInput!){
									users(where: $where){
										id
										username
										email
										image
									}
								}`
							;
							const variables = { where: { id: decoded.id } };
							return prisma.$graphql(query, variables);
						}
					});
			}
		},

		/**
		 * Get current user entity.
		 * Auth is required!
		 * 
		 * @actions
		 * 
		 * @returns {Object} User entity
		 */
		me: {
			auth: "required",
/*   			cache: {
				keys: ["#token"]
			}, */
			async handler(ctx) {
				const query = `
					query users($where: userWhereInput!, $where2: requestsWhereInput!){
						users(where: $where){
							id
							username
							email
							image
						} requestsesConnection(where: $where2){
							aggregate{count}
						}
					}`;
				const variables = { where: { id: ctx.meta.user.id }, where2: { userRequested: { id: ctx.meta.user.id } } };
				const user = await prisma.$graphql(query, variables);
				return this.transformEntity(user.users, true, ctx.meta.token, user.requestsesConnection);
			}
		},

		/**
		 * Update current user entity.
		 * Auth is required!
		 * 
		 * @actions
		 * 
		 * @param {Object} user - Modified fields
		 * @returns {Object} User entity
		 */
		updateMyself: {
			auth: "required",
			params: {
				user: { type: "object", props: {
					username: { type: "string", min: 2, optional: true, pattern: /^[a-zA-Z0-9]+$/ },
					password: { type: "string", min: 6, optional: true },
					email: { type: "email", optional: true },
					bio: { type: "string", optional: true },
					image: { type: "string", optional: true },
				}}
			},
			handler(ctx) {
				const newData = ctx.params.user;
				return this.Promise.resolve()
					.then(() => {
						if (newData.username)
							return this.adapter.findOne({ username: newData.username })
								.then(found => {
									if (found && found.id.toString() !== ctx.meta.user.id.toString())
										return Promise.reject(new MoleculerClientError("Username is exist!", 422, "", [{ field: "username", message: "is exist"}]));
									
								});
					})
					.then(() => {
						if (newData.email)
							return this.adapter.findOne({ email: newData.email })
								.then(found => {
									if (found && found.id.toString() !== ctx.meta.user.id.toString())
										return Promise.reject(new MoleculerClientError("Email is exist!", 422, "", [{ field: "email", message: "is exist"}]));
								});
							
					})
					.then(() => {
						newData.updatedAt = new Date();
						const update = {
							"$set": newData
						};
						return this.adapter.updateById(ctx.meta.user._id, update);
					})
					.then(doc => this.transformDocuments(ctx, {}, doc))
					.then(user => this.transformEntity(user, true, ctx.meta.token))
					.then(json => this.entityChanged("updated", json, ctx).then(() => json));

			}
		},

		/**
		 * Get a user profile.
		 * 
		 * @actions
		 * 
		 * @param {String} username - Username
		 * @returns {Object} User entity
		 */
		profile: {
			cache: {
				keys: ["#token", "username"]
			},
			params: {
				username: { type: "string" }
			},
			handler(ctx) {
				return this.adapter.findOne({ username: ctx.params.username })
					.then(user => {
						if (!user)
							return this.Promise.reject(new MoleculerClientError("User not found!", 404));

						return this.transformDocuments(ctx, {}, user);
					})
					.then(user => this.transformProfile(ctx, user, ctx.meta.user));
			}
		},

		/**
		 * Follow a user
		 * Auth is required!
		 * 
		 * @actions
		 * 
		 * @param {String} username - Followed username
		 * @returns {Object} Current user entity
		 */
		follow: {
			auth: "required",
			params: {
				username: { type: "string" }
			},
			handler(ctx) {
				return this.adapter.findOne({ username: ctx.params.username })
					.then(user => {
						if (!user)
							return this.Promise.reject(new MoleculerClientError("User not found!", 404));

						return ctx.call("follows.add", { user: ctx.meta.user.id.toString(), follow: user.id.toString() })
							.then(() => this.transformDocuments(ctx, {}, user));
					})
					.then(user => this.transformProfile(ctx, user, ctx.meta.user));
			}
		},	

		/**
		 * Unfollow a user
		 * Auth is required!
		 * 
		 * @actions
		 * 
		 * @param {String} username - Unfollowed username
		 * @returns {Object} Current user entity
		 */
		unfollow: {
			auth: "required",
			params: {
				username: { type: "string" }
			},
			handler(ctx) {
				return this.adapter.findOne({ username: ctx.params.username })
					.then(user => {
						if (!user)
							return this.Promise.reject(new MoleculerClientError("User not found!", 404));

						return ctx.call("follows.delete", { user: ctx.meta.user.id.toString(), follow: user.id.toString() })
							.then(() => this.transformDocuments(ctx, {}, user));
					})
					.then(user => this.transformProfile(ctx, user, ctx.meta.user));
			}
		},
		cors: {
			handler(ctx){
				return ;
			}
		},

		userFindOne: {
			params: {
				userName: { type: "string" },
				first: { type: "number" },
				skip: { type: "number" },
				//locality: { type: "string", optional: true }
				vars: { 
					type: "object", 
					props: {
						locality: { type: "string", optional: true },
						birthDay: { type: "string", optional: true }
					},
					optional: true
				}
			},
			//cache: true,
			async handler(ctx) {
				const query = `
				query users($data: userWhereInput!, $first: Int!, $skip: Int!, $vars: userWhereInput){
                    users(where: $data){
                        name
                        username
                        lastName
                        email
                        friends(first: $first, skip: $skip, where: $vars){
							username
							name
							lastName
							bio
							image
							locality
							birthDay
                        }
                        bio
						image
						locality
						locality
						birthDay
                    }
				}`;
				const variables = { 
					data: { 
						username: ctx.params.userName
					}, 
					first: ctx.params.first, 
					skip: ctx.params.skip,
					vars: {
						birthDay: ctx.params.vars.birthDay,
						locality: ctx.params.vars.locality
					}
				};
				const UserInfo = await prisma.$graphql(query, variables);
				return UserInfo;
			}
		},
		allFriends: {
			params: {
				userName: { type: "string" },
				vars: { 
					type: "object", 
					props: {
						locality: { type: "string", optional: true },
						birthDay: { type: "string", optional: true }
					},
					optional: true
				}
			}, 
			async handler(ctx) {
				const query = `
				query users($data: userWhereInput!, $vars: userWhereInput){
					users(where: $data){
						id
						name
						friends(where: $vars) {
							name
						}
					}
				}`;
				const variables = {
					data: {
						username: ctx.params.userName
					},					
					vars: {
						birthDay: ctx.params.vars.birthDay,
						locality: ctx.params.vars.locality
					}
				};
				const allFriends = await prisma.$graphql(query, variables);
				return allFriends;
			}
		},
		findUsers: {
			params: {
				username_contains: { type: "string" }
			},
			async handler(ctx) {
				const query = `
				query users($data: userWhereInput!){
					users(where: $data){
						id
						name
						username
						lastName
						bio
						image
					}
				}`;
				const variables = { data: { username_contains: ctx.params.username_contains } };
				const users = await prisma.$graphql(query, variables);
				return users;
			}
		},
		createRequest: {
			params: {
				userApplicant: { type: "string" },
				userRequested: { type: "string" }
			},
			async handler(ctx) {
				const mutation = `
					mutation createrequests($data: requestsCreateInput!) {
						createrequests(data: $data) {
							id
							userApplicant{ username }
							userRequested{ username }
						}
					}
				`;
				const variables = {
					data: {
						userApplicant: {
							connect: {
								username: ctx.params.userApplicant
							}
						},
						userRequested: {
							connect: {
								username: ctx.params.userRequested
							}
						}
					}
				};
				const createRequest = await prisma.$graphql(mutation, variables);
				return createRequest;
			}
		},
		countNotifications: {
			params: {
				userRequested: { type: "string" }
			},
			async handler(ctx) {
				const query = `
					query requestses($where: requestsWhereInput!) {
						requestsesConnection(where: $where){
							aggregate{count}
				  		}
					}
				`;
				const variables = {
					where: {
						userRequested: { username: ctx.params.userRequested }
					}
				};
				const countNotifications = await prisma.$graphql(query, variables);
				return countNotifications;
			}
		}
	},

	/**
	 * Methods
	 */
	methods: {
		/**
		 * Generate a JWT token from user entity
		 * 
		 * @param {Object} user 
		 */
		generateJWT(user) {
;			const today = new Date();
			const exp = new Date(today);
			exp.setDate(today.getDate() + 60);

			return jwt.sign({
				id: user.id,
				username: user.username,
				exp: Math.floor(exp.getTime() / 1000)
			}, this.settings.JWT_SECRET);
		},

		/**
		 * Transform returned user entity. Generate JWT token if neccessary.
		 * 
		 * @param {Object} user 
		 * @param {Boolean} withToken 
		 */
		transformEntity(user, withToken, token, requestsesConnection) {
			if (user) {
				//user.image = user.image || "https://www.gravatar.com/avatar/" + crypto.createHash("md5").update(user.email).digest("hex") + "?d=robohash";
				user.image = user.image || "";
				if (withToken)
					user.token = token || this.generateJWT(user);
			}
			return { user, requestsesConnection };
		},

		/**
		 * Transform returned user entity as profile.
		 * 
		 * @param {Context} ctx
		 * @param {Object} user 
		 * @param {Object?} loggedInUser 
		 */
		transformProfile(ctx, user, loggedInUser) {
			//user.image = user.image || "https://www.gravatar.com/avatar/" + crypto.createHash("md5").update(user.email).digest("hex") + "?d=robohash";
			user.image = user.image || "https://static.productionready.io/images/smiley-cyrus.jpg";

			if (loggedInUser) {
				return ctx.call("follows.has", { user: loggedInUser.id.toString(), follow: user.id.toString() })
					.then(res => {
						user.following = res;
						return { profile: user };
					});
			}

			user.following = false;

			return { profile: user };
		}
	},

	events: {
		"cache.clean.users"() {
			if (this.broker.cacher)
				this.broker.cacher.clean(`${this.name}.*`);
		},
		"cache.clean.follows"() {
			if (this.broker.cacher)
				this.broker.cacher.clean(`${this.name}.*`);
		}
	}	
};