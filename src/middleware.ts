import { NextRequest, NextResponse } from 'next/server';

function filterPrivatePath(path: string) {
  const privatePathPatterns = [
    /^\/community\/(create|edit)$/, //
    /^\/running\/(create|edit)$/, //
    /^\/my\/\d+$/,
    /^\/profile\/\d+$/,
  ];
  return privatePathPatterns.some((pattern) => pattern.test(path));
}

export async function middleware(request: NextRequest) {
  console.log('middleware ', request.nextUrl.pathname);
  const isPrivate = filterPrivatePath(request.nextUrl.pathname);

  if (isPrivate) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
