import nodemailer from 'nodemailer'

export const connectND = async() => {
    try{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port : 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    })
}catch(error){
    console.log(error)
}
}