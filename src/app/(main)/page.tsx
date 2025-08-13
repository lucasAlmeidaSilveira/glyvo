'use client';

import { InputForm } from '@/components/InputForm';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth, UserProps } from '@/contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <ProtectedRoute requireAuth={true}>
      <Card className='mx-4 bg-white p-2 max-w-[320px]'>
        <CardContent className='flex flex-col items-center justify-center p-2'>
          <InputForm user={user as UserProps} />
        </CardContent>
      </Card>
    </ProtectedRoute>
  );
}
