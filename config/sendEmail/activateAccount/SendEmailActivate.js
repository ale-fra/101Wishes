var SendEmailConfig = require('../SendEmailConfig.js');
var Message = require('./TemplateSendEmailActivate.js');
var Nodemailer = require("nodemailer");

module.exports = function(email, token) {
    this.email=email;
    this.token=token;


    this.mailOptions = {
            transport: SendEmailConfig.transport, // transport method to use
            from: "Sender Name <sender@example.com>", // sender address
            to: this.email, // list of receivers
            subject: "Welcome!", // Subject line
            text: Message.text(this.email,this.token), // plaintext body
            html: Message.html(this.email,this.token) // html body
       };


    this.sendActivateEmail = function(){

        Nodemailer.sendMail(this.mailOptions, function(error){
            if(error){
                console.log(error);
                console.log("Error sending activation Email to "+email);
            SendEmailConfig.transport.close(); // lets shut down the connection pool
                return(error);
            }else{
                console.log("Activation Email sent to "+email);
                SendEmailConfig.transport.close(); // lets shut down the connection pool

            }
        });
    };

}
