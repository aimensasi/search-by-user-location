import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken');
  console.log("🚀 ~ middleware ~ token:", token)

  if (!token && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token) {
    try {
      const payload = JSON.parse(atob(token.value.split('.')[1]));
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();

      if (currentTime >= expirationTime) {
        // Token has expired
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      console.error('Error parsing token:', error);
      // If there's an error parsing the token, treat it as invalid
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }


  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
