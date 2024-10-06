'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from 'next/navigation'

interface LoginSignupComponentProps {
  onSubmit: (username: string, password: string) => void
  isLogin: boolean
  error: string | null
}

export function LoginSignupComponent({ onSubmit, isLogin: defaultIsLogin, error }: LoginSignupComponentProps) {
  const router = useRouter()

  const [isLogin, setIsLogin] = useState(defaultIsLogin)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ username: '', password: '' })

  const validateForm = () => {
    let isValid = true
    const newErrors = { username: '', password: '' }

    if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long'
      isValid = false
    }

    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(username, password);
    }
  }

  const handlePageSwap = () => {
    if (isLogin) {
      router.replace('/register')
    } else {
      router.replace('/login')
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{isLogin ? 'Login' : 'Register'}</CardTitle>
        <CardDescription>
          {isLogin ? 'Enter your credentials to login' : 'Create a new account'}
        </CardDescription>
        {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
              {errors.username && <Alert variant="destructive"><AlertDescription>{errors.username}</AlertDescription></Alert>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              {errors.password && <Alert variant="destructive"><AlertDescription>{errors.password}</AlertDescription></Alert>}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <Button onClick={handleSubmit}>{isLogin ? 'Login' : 'Sign Up'}</Button>
        <p className="mt-2 text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            className="text-blue-600 hover:underline"
            onClick={handlePageSwap}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </CardFooter>
    </Card>
  )
}
