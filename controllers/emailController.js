'use strict'
const nodemailer = require('nodemailer');
const config = require('../helpers/config');

const transporter = nodemailer.createTransport({
    /*
    service: 'gmail',
    auth: {
        user: config.emailserver,
        pass: config.password
    }*/
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "733937d20884f6",
        pass: "9358351b617ef9"
    }

});
console.log("From:" + config.emailserver);

const emailView = (req, res, next) => {
    res.render('email');
}


const sendEmail = (req, res, next) => {

    try {
        const { emailobject } = req.body;
        const files = req.files;
        const ename = "Test company";
        if (emailobject) {
            const email = JSON.parse(emailobject);
            const mailoptions = {
                from: config.emailserver,
                to: email.emailto,
                cc: email.emailcc,
                bcc: email.emailbcc,
                subject: email.subject,
                html: email.body,
                attachments: files
            };
            transporter.sendMail(mailoptions, function(err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Email Send ' + info.response);
                    console.log(res);
                }
            });
        }
        res.status(200).send('Email Sent Successfully');


    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = {
    emailView,
    sendEmail
}