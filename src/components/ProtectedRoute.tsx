'use client';

import { useAuth } from '@/contexts/AuthContext';
import Loading from './Loading';
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
    return <Loading />;
  }

  return <>{children}</>;
}
