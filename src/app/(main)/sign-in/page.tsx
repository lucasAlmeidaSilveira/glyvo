'use client'

import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export default function SignIn() {
  const { user, loginWithGoogle } = useAuth()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  useEffect(() => {
    if (user) {
      redirect('/')
    }
  }, [user])

  const handleGoogleLogin = async () => {
    try {
      setIsLoggingIn(true)
      await loginWithGoogle()
    } catch (error) {
      console.error('Erro no login:', error)
      setIsLoggingIn(false)
    }
  }

  return (
    <Button
      variant="secondary"
      size="default"
      className="rounded-full"
      onClick={handleGoogleLogin}
      disabled={isLoggingIn}
    >
      {isLoggingIn ? (
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-gray-600"></div>
          Entrando...
        </div>
      ) : (
        <>
          <FcGoogle className="mr-2 text-xl" />
          FAZER LOGIN COM GOOGLE
        </>
      )}
    </Button>
  )
}
