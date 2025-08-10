'use client';

import { InputForm } from "@/components/InputForm";
import { Card, CardContent } from '@/components/ui/card';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  // trocar para false quando o login estiver funcionando
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      redirect('/sign-in');
    }
  }, [isLoggedIn]);

  return (
    <Card className='mx-4 bg-white'>
      <CardContent className='flex flex-col items-center justify-center'>
        <InputForm />
      </CardContent>
    </Card> 
  );
}
