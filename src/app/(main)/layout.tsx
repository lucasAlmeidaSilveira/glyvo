'use client';

import Footer from '@/components/Footer';
import Logo from '@/components/Logo';
import Menu from '@/components/Menu';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Toaster } from '@/components/ui/sonner';
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  
  return (
    <ProtectedRoute requireAuth={true}>
      <div className='flex flex-col items-center justify-center h-screen gap-6'>
        <div className='flex items-center justify-between gap-4'>
          <Link href="/">
            <Logo />
          </Link>
          {user && <Menu user={user} logout={logout} />}
        </div>
        {children}
        <Footer />
        <Toaster />
      </div>
    </ProtectedRoute>
  );
}
