import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function POST() {
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

  var info = await transporter.sendMail({
    from: '"A2ZZZ 🙋🏻‍♂️" <mdhabiborrahman@a2zzz.com>', // sender address
    to: "mdhera211@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

  return NextResponse.json({
    body: {
      message: info.messageId,
    },
  });
}
