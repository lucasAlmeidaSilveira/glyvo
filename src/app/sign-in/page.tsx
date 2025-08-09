import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { FcGoogle } from "react-icons/fc";

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
      <Button variant="secondary" size="default" className="mt-8 rounded-full font-semibold">
        <FcGoogle />
        FAZER LOGIN COM GOOGLE
      </Button>
    </div>
  );
}
