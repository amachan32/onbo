import { LoginForm } from '@/components/auth/login-form'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-6 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">ログイン</h1>
        <p className="text-gray-500">アカウントにログインしてください</p>
      </div>
      <LoginForm />
      <p className="text-center text-sm text-gray-500">
        アカウントをお持ちでない方は{' '}
        <Link href="/auth/register" className="font-medium text-primary hover:underline">
          こちら
        </Link>
      </p>
    </div>
  )
}
