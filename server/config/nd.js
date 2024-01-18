// import nodemailer from 'nodemailer';

// export const connectND = async () => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.SMTP_USER,
//       to: 'recipient@example.com',
//       subject: 'Test Email',
//       text: 'This is a test email sent from Nodemailer!',
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return console.log('Error sending email:', error);
//       }
//       console.log('Email sent:', info.response);
//     });

//   } catch (error) {
//     console.log(error);
//   }
// };
