'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user) {
        // Se precisa de autenticação e não tem usuário, vai para login
        router.push('/sign-in');
      } else if (!requireAuth && user) {
        // Se não precisa de autenticação e tem usuário, vai para home
        router.push('/');
      }
    }
  }, [user, isLoading, requireAuth, router]);

  // Mostra loading enquanto verifica
  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center h-screen gap-6'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white'></div>
        <p className='text-white text-lg'>Carregando...</p>
      </div>
    );
  }

  return <>{children}</>;
}
