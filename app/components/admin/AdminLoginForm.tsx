'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/app/statics/styles/adminPage.module.css'

export default function AdminLoginForm() {
  const router = useRouter()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, password }),
    })

    if (res.ok) {
      router.push('/adminLogin/adminPage')
    } else {
      setError('ID またはパスワードが正しくありません')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.form}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="管理者ID"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
        />
        <button type="submit">ログイン</button>
        {error && <p>{error}</p>}
      </div>
    </form>
  )
}
