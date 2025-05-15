import { NextResponse } from 'next/server';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const protectedRoutes = ['/notes', '/settings'];
  const isProtectedRoute = protectedRoutes.includes(pathname);

  // Check for Firebase auth token in cookies (set by Firebase client SDK)
  const token = req.cookies.get('__session')?.value;

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/notes', '/settings']
};