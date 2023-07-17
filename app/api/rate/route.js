import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import axios from "axios";

async function scrape() {

    const browser = await puppeteer.launch({
        slowMo:10,
        args: [
          "--disable-setuid-sandbox",
          "--no-sandbox",
          "--single-process",
          "--no-zygote",
        ],
        
       
      });
   
    const page = await browser.newPage();

    await page.goto("https://www.taptapsend.com/country-landing-pages/bangladesh");

    // Wait for the country selector and select Canada
    await page.waitForSelector('#origin-currency');
    await page.select('#origin-currency', 'CA');

    // Wait for the FX rate text to load
    await page.waitForSelector('#fxRateText');

    // Get the price text
    const priceElement = await page.$('#fxRateText');

    const price = await page.evaluate(element => element.textContent, priceElement);

    // Print the price
    console.log('The price is:', price);

    await browser.close();

    return price;
  }



async function email(data) {
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
    from: '"A2ZZZ - bot 🙋🏻‍♂️" <mdhabiborrahman@a2zzz.com>', // sender address
    to: "mdhera211@gmail.com", // list of receivers
    subject: "TapTap rate cad to bdt ✔", // Subject line
    text: data, // plain text body
    html: `<b>${data}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  return info.messageId;
}

export async function POST() {
  const success = await scrape();

  // const resemail = await email(success)

  return NextResponse.json({
    body: {
      message: "resemail",
      data: "cad to bdt rate now" + success,
    },
  });
}
