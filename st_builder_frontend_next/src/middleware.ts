import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (!req.nextauth.token?.roles?.includes("ADMIN")) {
        return Response.redirect(new URL("/login", req.url))
      }
    }
  },
  {
  pages: {
    signIn: "/login",
  },
})

export const config = {
  matcher: [
    "/sites/:path*",
    "/admin/:path*",
  ],
}
