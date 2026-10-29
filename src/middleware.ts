import { auth } from './lib/auth'
import { NextResponse } from 'next/server'

export async function middleware(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers })

  // Add session to request headers for use in server components
  const requestHeaders = new Headers(request.headers)
  if (session) {
    requestHeaders.set('x-user-id', session.user.id)
    requestHeaders.set('x-user-email', session.user.email)
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (Better Auth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
  ],
}