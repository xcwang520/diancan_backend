var nodemailer = require('nodemailer'),
    config = require('./config'),
    smtpTransport = nodemailer.createTransport(config.mail.from);

/**
 * @param {String} subject：发送的主题
 * @param {String} html：发送的 html 内容
 */
function sendMail(subject, html, tos) {
    var mailOptions = {
        from: [config.mail.from.name, config.mail.from.auth.user].join(' '),
        to: tos.join(','),
        subject: subject,
        html: html
    };

    smtpTransport.sendMail(mailOptions, function(error, response){
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + response.message);
        }
        smtpTransport.close();
    });
};
module.exports.sendMail = sendMail;
