import { NextRequest, NextResponse } from 'next/server'
import { getUserInfo, isLoggedIn } from './libs/auth/actions'

// Specify protected and public routes
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {
  // Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const loggedIn = await isLoggedIn();
  // await getUserInfo();

  // console.log(
  //   `    -------------------
  //   Public: ${isPublicRoute}
  //   Protected: ${isProtectedRoute}
  //   Loggedin: ${loggedIn}
  //   -------------------`
  // );

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !loggedIn) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    loggedIn &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  // Continue on public routes and authenticated protected routes
  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}