
const nodemailer = require('nodemailer');
const config = require('../../keys/development.keys');


exports.sendMail = ( text) => {

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.EMAIL_FROM,
            pass: config.PASSWORD,
        },
    });

    const retry = require('retry');

    const operation = retry.operation({
        retries: 3,
        factor: 2,
        minTimeout: 1000,
        maxTimeout: 60000,
        randomize: true,
    });

    return new Promise((resolve, reject) => {
        operation.attempt(async (currentAttempt) => {
            try {
                const mailOptions = {
                    from: {
                        name: 'LIVOSO TECHNOLOGY',
                        address: config.EMAIL_FROM,
                    },
                    to: "hello@livoso.co",
                    subject: "New Enquiry Form Submission - Livoso Technology",
                    text: text,
                };
                const info = await transporter.sendMail(mailOptions);
                console.log('Email sent successfully:', info.response);
                resolve(info);
            } catch (error) {
                console.error(`Error sending email (attempt ${currentAttempt}):`, error);

                if (operation.retry(error)) {
                    console.log(`Retrying after ${operation._timeouts[operation._attempts - 1]} ms`);
                } else {
                    reject(error);
                }
            }
        });
    });
};