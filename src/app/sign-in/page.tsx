import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Image
        aria-hidden
        src='/logoFullWhite.svg'
        alt='Glyvo logo'
        width={180}
        height={56}
      />
      <Button variant="secondary" size="lg" className="mt-8">
        Entrar com Google
      </Button>
    </div>
  );
}
