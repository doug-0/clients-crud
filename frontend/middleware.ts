import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const authenticated = false;

  if (!authenticated && request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/signup') {
    return NextResponse.redirect(new URL('/login', request.url).toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
}



