// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value

  // If trying to access /dashboard and not authenticated, redirect
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url)) // or your login page
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/attendace/:path*',
    '/attendaceOfficers/:path*',
    '/attendaceReport/:path*',
    '/birthday/:path*',
    '/dashboard/:path*',
    '/dashboardUsers/:path*',
    '/inactive/:path*',
    '/liturgicalObj/:path*',
    '/members/:path*',
    '/memberUsers/:path*',
    '/sacraments/:path*',
    '/signup/:path*',
    '/signup2/:path*',
    '/signup3/:path*',
    '/userProfile/:path*',
    '/vesselsVestments/:path*',

  ],
}

