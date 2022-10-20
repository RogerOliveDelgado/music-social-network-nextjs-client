import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { jwtVerify } from "jose";

export default async function middleware(req: NextRequest) {
  const userToken = req.cookies.get("userToken");


  if (userToken === undefined) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(
      userToken,
      new TextEncoder().encode(
        "a041e6a6da2622fb599da9592cea604bd08ef5fcf361c6f51a8410a5748cdb0cd5a1bcb71d8cf16097e90e56465032e81acf863a888217600a9c5797315c16bb"
      )
    );
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
