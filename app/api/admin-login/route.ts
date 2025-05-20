// app/api/admin-login/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { serialize } from 'cookie'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser()
  const body = await request.json()
  const { userId, password } = body

  const validId = process.env.ADMIN_ID
  const validPassword = process.env.ADMIN_PASSWORD

  if (userId === validId && password === validPassword && currentUser?.isAdmin) {
      const response = NextResponse.json({ message: 'ログイン成功' })

      response.headers.set(
          'Set-Cookie',
          serialize('admin', 'true', {
              path: '/',
              httpOnly: true,
              maxAge: 60,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict'
          })
      )

      return response
  }

  return NextResponse.json(
    { message: '不正な認証情報です' },
    { status: 401 }
  )
}
