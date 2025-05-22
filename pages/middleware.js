import { NextResponse } from 'next/server';
import { getAuth, initializeApp, getApps, cert } from 'firebase-admin/app';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const protectedRoutes = ['/notes', '/settings'];
  const isProtectedRoute = protectedRoutes.includes(pathname);

  // Get Firebase auth token from cookies
  const token = req.cookies.get('__session')?.value;

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Verify token with Firebase Admin SDK
  if (isProtectedRoute && token) {
    try {
      await getAuth().verifyIdToken(token);
      return NextResponse.next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/notes', '/settings'],
};
