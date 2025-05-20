// app/admin/login/page.tsx
import { notFound } from 'next/navigation'
import getCurrentUser from '@/app/actions/getCurrentUser'
import AdminLoginForm from '@/app/components/admin/AdminLoginForm'

export default async function AdminLoginPage() {
  const currentUser = await getCurrentUser()

  // 管理者でなければ 404 にする
  if (!currentUser?.isAdmin) {
    notFound()
  }

  // 管理者ならログインフォームを表示（クライアントコンポーネント）
  return <AdminLoginForm />
}
