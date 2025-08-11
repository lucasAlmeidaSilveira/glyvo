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
    <Card className='mx-4 bg-white p-2 max-w-[320px]'>
      <CardContent className='flex flex-col items-center justify-center p-2'>
        <InputForm />
      </CardContent>
    </Card> 
  );
}
