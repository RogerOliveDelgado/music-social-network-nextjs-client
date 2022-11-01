import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const BASE_URL = process.env.USERS_BACKEND_ || "http://localhost:4001"
const JWT_EXPIRED_MESSAGE = "jwt expired"

export default async function middleware(req: NextRequest) {
  const userToken = req.cookies.get("userToken");

  if (userToken === undefined) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // const response = await fetch(`${BASE_URL}/auth`, {
    //   method: 'GET',
    //   headers: new Headers({
    //     'Authorization': `bearer ${userToken}`
    //   })
    // })
    // const data = await response.json()
    // if(!data.ok && msg!== JWT_EXPIRED_MESSAGE) {throw new Error}
    // if(!data.ok && msg === JWT_EXPIRED_MESSAGE) {
    // }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/favorites",
    "/artist",
    "/album",
    "/playlist",
    "/library",
    "/search/:path*",
  ],
};