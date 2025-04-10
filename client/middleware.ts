import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const middleware = async (request: NextRequest) => {
  const session = await auth();

  if (!session?.user) {
    if (request.nextUrl.pathname.startsWith('/profile')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  if (session?.user && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/login', "/profile", "/api/profile"],
};