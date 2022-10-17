import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const userToken = req.cookies.get("userToken");

  const url = req.url;

  if (
    url.includes("/es/home") ||
    url.includes("/es/album") ||
    url.includes("/es/artist") ||
    url.includes("/es/library")
    // ||
    // url.includes("/es/playlist")
  ) {
    if (userToken === undefined) {
      return NextResponse.redirect("http://localhost:3000/es");
    }
  }

  return NextResponse.next();
}
