nodemailer = require("nodemailer");
exports.transport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "alessandro.francia@gmail.com",
        pass: "senodialfa"
    },
    tls:{
        secureProtocol: "TLSv1_method"
    }
});
