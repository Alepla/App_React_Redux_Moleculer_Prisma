"use strict";

const _ = require("lodash");
const ApiGateway = require("moleculer-web");
const { UnAuthorizedError } = ApiGateway.Errors;

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	settings: {
		port: process.env.PORT || 3000,

		routes: [{
			path: "/api",

			authorization: true,

			aliases: {
				// Login
				"POST /users/login": "users.login",
				//"OPTIONS /user/login": "users.cors",

				//Create
				"POST /users/create": "users.create",

				// Users
				"REST /users": "users",
				//"OPTIONS /user/login": "users.cors",

				// Current user
				"GET /user": "users.me",
				//"OPTIONS /user/login": "users.cors",
				"PUT /user": "users.updateMyself",
				//"OPTIONS /user/login": "users.cors",

				//One user
				"POST /user/one": "users.userFindOne",

				//All friends
				"POST /user/allFriends": "users.allFriends",
				//Users search
				"POST /users/search": "users.findUsers",

				// Articles
				"GET /articles/feed": "articles.feed",
				//"OPTIONS /articles/login": "users.cors",
				"REST /articles": "articles",
				//"OPTIONS /articles/login": "users.cors",
				"GET /tags": "articles.tags",
				//"OPTIONS /tags/login": "users.cors",

				// Comments
				"GET /articles/:slug/comments": "articles.comments",
				//"OPTIONS /articles/login": "users.cors",
				"POST /articles/:slug/comments": "articles.addComment",
				//"OPTIONS /articles/login": "users.cors",
				"PUT /articles/:slug/comments/:commentID": "articles.updateComment",
				//"OPTIONS /articles/login": "users.cors",
				"DELETE /articles/:slug/comments/:commentID": "articles.removeComment",
				//"OPTIONS /articles/login": "users.cors",

				// Favorites
				"POST /articles/:slug/favorite": "articles.favorite",
				//"OPTIONS /articles/login": "users.cors",
				"DELETE /articles/:slug/favorite": "articles.unfavorite",
				//"OPTIONS /articles/login": "users.cors",

				// Profile
				"GET /profiles/:username": "users.profile",
				//"OPTIONS /profiles/login": "users.cors",
				"POST /profiles/:username/follow": "users.follow",
				//"OPTIONS /profiles/login": "users.cors",
				"DELETE /profiles/:username/follow": "users.unfollow",
				//"OPTIONS /profiles/login": "users.cors",

				//Contact
				"POST /contact": "contact.sendMail",

				//Friends
				"POST /friends": "friends.listMyFriends",
				
			},

			// Disable to call not-mapped actions
			//mappingPolicy: "restrict",

			// Set CORS headers
			cors: true,

			// Parse body content
			bodyParsers: {
				json: {
					strict: false
				},
				urlencoded: {
					extended: false
				}
			}
		}],

		assets: {
			folder: "./public"
		},

		// logRequestParams: "info",
		// logResponseData: "info",

		onError(req, res, err) {
			// Return with the error as JSON object
			res.setHeader("Content-type", "application/json; charset=utf-8");
			res.writeHead(err.code || 500);

			if (err.code == 422) {
				let o = {};
				err.data.forEach(e => {
					let field = e.field.split(".").pop();
					o[field] = e.message;
				});

				res.end(JSON.stringify({ errors: o }, null, 2));				
			} else {
				const errObj = _.pick(err, ["name", "message", "code", "type", "data"]);
				res.end(JSON.stringify(errObj, null, 2));
			}
			this.logResponse(req, res, err? err.ctx : null);
		}

	},

	methods: {
		/**
		 * Authorize the request
		 *
		 * @param {Context} ctx
		 * @param {Object} route
		 * @param {IncomingRequest} req
		 * @returns {Promise}
		 */
		authorize(ctx, route, req) {
			let token;
			if (req.headers.authorization) {
				let type = req.headers.authorization.split(" ")[0];
				if (type === "Token" || type === "Bearer")
					token = req.headers.authorization.split(" ")[1];
			}

			return this.Promise.resolve(token)
				.then(token => {
					if (token) {
						// Verify JWT token
						return ctx.call("users.resolveToken", { token })
							.then(user => {
								
								if (user) {
									this.logger.info("Authenticated via JWT: ", user.username);
									// Reduce user fields (it will be transferred to other nodes)
									user.users.map((x) => {
										//console.log(x.id);
										ctx.meta.user = x;
									})
									//ctx.meta.user = _.pick(user.users, ["_id", "username", "email", "image"]);
									ctx.meta.token = token;
								}
								return user;
							})
							.catch(err => {
								// Ignored because we continue processing if user is not exist
								return null;
							});
					}
				})
				.then(user => {
					if (req.$endpoint.action.auth == "required" && !user)
						return this.Promise.reject(new UnAuthorizedError());
				});
		},

		/**
		 * Convert ValidationError to RealWorld.io result
		 * @param {*} req 
		 * @param {*} res 
		 * @param {*} err 
		 */
		/*sendError(req, res, err) {
			if (err.code == 422) {
				res.setHeader("Content-type", "application/json; charset=utf-8");
				res.writeHead(422);
				let o = {};
				err.data.forEach(e => {
					let field = e.field.split(".").pop();
					o[field] = e.message;
				});
				return res.end(JSON.stringify({
					errors: o
				}, null, 2));
				
			}			
			
			return this._sendError(req, res, err);
		}*/
	},

	created() {
		// Pointer to the original function
		//this._sendError = ApiGateway.methods.sendError.bind(this);
	}


};
