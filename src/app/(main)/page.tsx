'use client';

import { InputForm } from "@/components/InputForm";
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {

  return (
    <Card className='mx-4 bg-white p-2 max-w-[320px]'>
      <CardContent className='flex flex-col items-center justify-center p-2'>
        <InputForm />
      </CardContent>
    </Card> 
  );
}
