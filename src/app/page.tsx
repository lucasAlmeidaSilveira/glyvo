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
    </div>
  );
}
