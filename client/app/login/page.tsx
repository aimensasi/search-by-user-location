'use client'
import { LoginSignupComponent } from '@/components/login-signup'
import { useAuth } from '@/app/hooks/useAuth'

export default function AuthPage() {
  const { handleLogin, error } = useAuth()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginSignupComponent onSubmit={handleLogin} isLogin={true} error={error} />
    </div>
  )
}
