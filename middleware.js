import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

export async function  middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  // No token at all
  if (!token) {
    if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  try {
    
    const decoded = jwtVerify(token, process.env.JWT_SECRET);
//    console.log(decoded.role)
//     //Role-based access control
    // if (url.pathname.startsWith("/admin")) {
    //   return NextResponse.redirect(new URL("/unauthorized", req.url));
    // }

//     if (url.pathname.startsWith("/user") && !["user", "admin"].includes(decoded.role)) {
//       return NextResponse.redirect(new URL("/unauthorized", req.url));
//     }

    return NextResponse.next();
  } catch (err) {
    console.log(err)
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};


