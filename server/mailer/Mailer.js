import nodemailer from "nodemailer"

const sendResetEmail = ({to , resetLink}) => {
    const transport = nodemailer.createTransport({
        service : "Gmail",
        host : "smtp.gmail.com",
        port : 465,
        secure : true,
        auth : {
            user : process.env.SMTP_USER,
            pass : process.env.SMTP_PASS
        }
    })

    const mailOptions = {
        from : "nischay228074@gmail.com",
        to : to,
        subject : "Password Reset Link",
        text : `Please click the following link to reset your password: ${resetLink}`
    }

    transport.sendMail(mailOptions)
}

export {sendResetEmail};