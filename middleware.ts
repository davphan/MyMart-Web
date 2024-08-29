import { auth } from "@/libs/auth/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/', '/login', 'signup'];
const loginRoutes = ['/login', '/signup'];

export default async function middleware(req: NextRequest) {
  // Check whether route is protected or not
  const path: string = req.nextUrl.pathname;
  const isProtectedRoute: Boolean = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isLoginRoute = loginRoutes.includes(path);

  // Get session info
  const session = await auth();

  // For protected routes, check if user is authenticated and the correct user
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // For login and signup routes, if the user is signed in then redirect to dashboard
  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
