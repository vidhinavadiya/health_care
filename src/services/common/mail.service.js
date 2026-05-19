const nodemailer = require('nodemailer');

const Transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

const sendMail = async ({ to, subject, html }) => {
    return Transporter.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject,
        html,
    });
};

module.exports = { sendMail };