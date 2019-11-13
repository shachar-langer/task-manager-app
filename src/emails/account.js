const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = ''

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'shachar.langer@gmail.com',
        subject: 'Welcome to the Task app!',
        text: `Welcome to the app, ${name}. Enjoy using the app.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'shachar.langer@gmail.com',
        subject: 'Account was successfully deleted',
        text: `Hi ${name}, your account was successfully deleted. We hope you enjoyed using our app.`        
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}