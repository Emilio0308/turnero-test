import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const requestedPage = req.nextUrl.pathname;

  if (requestedPage.startsWith("/api/users")) {
    const authorizationHeader = req.headers.get("authorization");

    if (!authorizationHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.next();
  }

  if (requestedPage.startsWith("/packs")) {
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = `/auth/login`;
      url.search = `p=${requestedPage}`;
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }
}

// export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/packs/:path*", "/api/:path*"],
};
