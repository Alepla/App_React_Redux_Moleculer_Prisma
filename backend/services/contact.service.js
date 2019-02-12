"use strict";
const nodemailer = require("nodemailer");
const jwt 			= require("jsonwebtoken");

module.exports = {
    name: "contact",
    /**
	 * Default settings
	 */
	settings: {
		/** Secret for JWT */
		JWT_SECRET: process.env.JWT_SECRET || "jwt-conduit-secret",

		/** Public fields */
		//fields: ["_id", "username", "email", "bio", "image"],
	},
    actions: {
        sendMail: {
            params: {
                data: {
                    type: "object", props: {
                        email: { type: "email" },
                        subject: { type: "string", min: 1 },
                        message: { type: "string", min: 10, max: 100 }
                    }
                }
            },
            async handler(ctx) {                
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    requireTLS: true,
                    auth: {
                        user: 'crowcodesl@gmail.com',
                        pass: 'assassinscreed1' 
                    }
                });
            
                // setup email data with unicode symbols
                let mailOptions = {
                    from: '<crowcodesl@gmail.com>', 
                    to: ctx.params.data.email, 
                    subject: ctx.params.data.subject, 
                    text: ctx.params.data.message, 
                    html: "<b>" + ctx.params.data.message + "</b>" 
                };
            
                // send mail with defined transport object
                let info = await transporter.sendMail(mailOptions)
            
                console.log("Message sent: %s", info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
        }
    }
}