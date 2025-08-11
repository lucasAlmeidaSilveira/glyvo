import Footer from '@/components/Footer';
import Logo from '@/components/Logo';
import Menu from '@/components/Menu';
import { Toaster } from '@/components/ui/sonner';
import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-6'>
      <div className='flex items-center justify-between gap-4'>
        <Link href="/">
          <Logo />
        </Link>
        <Menu />
      </div>
      {children}
      <Footer />
      <Toaster />
    </div>
  );
}
