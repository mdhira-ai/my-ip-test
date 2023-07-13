import { NextResponse } from "next/server";
import { headers } from 'next/headers'

export async function GET(req) {
  // const { searchParams } = new URL(request.url);

  let ip;

  // const { req } = request;
  const headersList = headers()
  const referer = headersList.get('x-forwarded-for')

  // if (req.headers['x-forwarded-for']) {
  //   ip = req.headers['x-forwarded-for'].split(',')[0];
  // } else if (req.headers['x-real-ip']) {
  //   ip = req;
  // } else {
  //   ip = req;
  // }

  console.log(referer);

  return NextResponse.json({
    body: {
      message: referer,
    },
  });
}
