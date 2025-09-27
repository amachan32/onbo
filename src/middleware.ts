import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default withAuth(
  function middleware(request: NextRequest) {
    const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
    const isRegisterPage = request.nextUrl.pathname === '/auth/register'

    if (isAuthPage && !isRegisterPage) {
      // ログイン済みユーザーが認証ページ（登録ページ以外）にアクセスした場合はホームにリダイレクト
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // 登録ページは未認証でもアクセス可能
        if (req.nextUrl.pathname === '/auth/register') {
          return true
        }
        // その他のページは認証が必要
        return !!token
      }
    },
    pages: {
      signIn: '/auth/login'
    }
  }
)

export const config = {
  // api routes, static files, imagesは除外
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
