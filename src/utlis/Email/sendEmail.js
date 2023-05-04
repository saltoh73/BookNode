import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import { htmlEmail } from './Email.html.js';

export const sendEmail= async(options)=>{
    let transporter = nodemailer.createTransport({
      service:'gmail',
        auth: {
          user: 'kareemhanysaltoh@gmail.com', 
          pass: 'gplkuvymqsvimnbe', 
        },
      });

      var token=  jwt.sign({ email:options.email }, 'kareemhanys');


     let info = await transporter.sendMail({
    from: '"Hello Ahmed" <kareemhanysaltoh@gmail.com>', // sender address
    to: options.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: htmlEmail(token), // html body
  });

}