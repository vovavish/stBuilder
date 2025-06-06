import { NextResponse } from 'next/server';
import { NextFetchEvent } from 'next/server'; // Оставляем для основного middleware
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'; // Импортируем NextRequestWithAuth

export default function middleware(req: NextRequestWithAuth) {
  const host = req.headers.get('host') || '';
  const subdomain = host.split('.')[0];
  const isRootDomain =
    host === 'stbuilder.ru' ||
    host === 'stbuilder.ru:3001' ||
    host === 'localhost:3001' ||
    subdomain === 'www';

  console.log('Middleware - Host:', host);
  console.log('Middleware - Subdomain:', subdomain);
  console.log('Middleware - isRootDomain:', isRootDomain);

  if (!isRootDomain) {
    const url = req.nextUrl.clone();
    url.pathname = `/${subdomain}${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  const authMiddleware = withAuth(
    function authMiddleware(req: NextRequestWithAuth) {
      if (req.nextUrl.pathname.startsWith('/admin')) {
        if (!req.nextauth.token?.roles?.includes('ADMIN')) {
          return NextResponse.redirect(new URL('/login', req.url));
        }
      }
      return NextResponse.next();
    },
    {
      pages: {
        signIn: '/login',
      },
    }
  );

  return authMiddleware(req, {} as NextFetchEvent);
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico|register|login|terms|$|assets).*)'],
};