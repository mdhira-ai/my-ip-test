import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: {
    user: "mdhabiborrahman@a2zzz.com",
    pass: "82fQHM6iQzg0",
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

let jobid =''

async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"A2ZZZ 🙋🏻‍♂️" <mdhabiborrahman@a2zzz.com>', // sender address
      to: "mdhera211@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    jobid = info.messageId
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
  }

export async function GET() {

    main().catch(console.error);


  return NextResponse.json({
    body: {
      message: jobid,
    },
  });
}
