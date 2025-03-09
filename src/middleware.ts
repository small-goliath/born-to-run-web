// import { cookies } from 'next/headers';
// import { NextRequest, NextResponse } from 'next/server';
// import { ACCESS_TOKEN } from './service/httpClient';

// function filterPrivatePath(path: string) {
//   const privatePathPatterns = [
//     /^\/community\/(create|edit)$/, //
//     /^\/running\/(create|edit)$/, //
//     /^\/my\/\d+$/,
//     /^\/profile\/\d+$/,
//   ];
//   return privatePathPatterns.some((pattern) => pattern.test(path));
// }

// export async function middleware(request: NextRequest) {
//   const token = cookies().get(ACCESS_TOKEN);
//   console.log('middleware ', token);
//   const isPrivate = filterPrivatePath(request.nextUrl.pathname);

//   if (!token && isPrivate) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };
