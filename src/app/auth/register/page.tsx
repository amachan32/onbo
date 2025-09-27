import { RegisterForm } from '@/components/auth/register-form'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md space-y-6 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">アカウント作成</h1>
        <p className="text-gray-500">新しいアカウントを作成してください</p>
      </div>
      <RegisterForm />
      <p className="text-center text-sm text-gray-500">
        すでにアカウントをお持ちの方は{' '}
        <Link href="/auth/login" className="font-medium text-primary hover:underline">
          こちら
        </Link>
      </p>
    </div>
  )
}
