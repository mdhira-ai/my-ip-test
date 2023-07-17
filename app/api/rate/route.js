import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import axios from "axios";

async function scrape() {
    const browser = await puppeteer.launch(
        {
            headless: "new",
            slowMo:10,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },

    );
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

// async function scrape() {
//   const response = await axios.get(
//     "https://www.taptapsend.com/country-landing-pages/bangladesh"
//   );
//   const html = response.data;

//   const $ = cheerio.load(html);


//   // Get the title of the page
//   const title = $("title").text();
//   console.log("The title of the page is:", title);

//   // Select Canada as the origin country
//   $("#origin-currency").val("CA");

//   // Input the amount

//   // Wait for the FX rate to load
//   await new Promise((resolve) => setTimeout(resolve, 3000));

//   // Get the BDT price
//   const bdtPrice = $("#fxRateText").text();
//   console.log("The BDT price is:", bdtPrice);

//   return bdtPrice;
// }

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
