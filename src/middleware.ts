import { NextResponse, NextRequest } from 'next/server';
import { fetchUser } from './api/bettor/auth';


export function middleware(request: NextRequest) {
  // const fetch = async () => {
  //   const response = fetchUser()
  //   console.log(response?.user_level)
  // }
  // fetch()
  // if (request.nextUrl.pathname.startsWith('/declarator')) {
  //   return NextResponse.rewrite(new URL('/declarator/test', request.url))
  // }
 
  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  // }
}