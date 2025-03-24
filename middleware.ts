import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function middleware(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.next();
  }

  if (session?.user && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login'],
};