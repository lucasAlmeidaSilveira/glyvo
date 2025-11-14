'use client'

import Link from 'next/link'

import Logo from '@/components/Logo'
import Menu from '@/components/Menu'
import Navbar from '@/components/Navbar'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Toaster } from '@/components/ui/sonner'
import { useAuth } from '@/contexts/AuthContext'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, logout } = useAuth()

  return (
    <ProtectedRoute requireAuth={true}>
      <div className="flex h-[calc(100vh-96px)] flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/">
            <Logo />
          </Link>
          {user && <Menu user={user} logout={logout} />}
        </div>
        {children}
        <Toaster />
        <Navbar />
      </div>
    </ProtectedRoute>
  )
}
