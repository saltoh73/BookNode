import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import { htmlEmail2 } from './Code.html.js';

export const sendEmail2= async(options)=>{
    let transporter = nodemailer.createTransport({
      service:'gmail',
        auth: {
          user: 'kareemhanysaltoh@gmail.com', 
          pass: 'gplkuvymqsvimnbe', 
        },
      });

      var token=  jwt.sign({ email:options.email }, 'kareemhany011');


     let info = await transporter.sendMail({
    from: '"Hello Ahmed" <kareemhanysaltoh@gmail.com>', // sender address
    to: options.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: htmlEmail2(token), // html body
  });

}