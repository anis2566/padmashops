import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  "/seller(.*)",
  "/sign-up/seller",
  "/support/seller",
  "/account",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    const role = auth().sessionClaims?.role;
    if (!auth().userId) {
      auth().protect();
    } else {
      if (req.nextUrl.pathname.startsWith("/seller") && role !== "seller") {
        return NextResponse.redirect(new URL("/sign-up/seller", req.url));
      }

      if (req.nextUrl.pathname.startsWith("/dashboard") && role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
