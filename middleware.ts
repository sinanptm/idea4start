// File: src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
// import { auth } from './auth';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function middleware(request:NextRequest) {
  // const session = await auth();
  
  // const protectedPaths = ['/api/idea', '/api/idea/:path*'];
  // const isProtectedPath = protectedPaths.some(path => 
  //   request.nextUrl.pathname.startsWith(path)
  // );

  // if (isProtectedPath && !session) {
  //   const loginUrl = new URL('/api/auth/signin', request.url);
  //   loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}

// export const config = {
//   matcher: ['/api/idea:path*', '/api/idea'],
// };