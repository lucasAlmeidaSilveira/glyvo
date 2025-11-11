import Link from "next/link";
import { FaFileLines } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="flex bg-primary-foreground w-full px-4 py-1 pb-4 justify-center fixed bottom-0 shadow-md">
      <div className="mx-2 flex w-full justify-evenly">
        <Link href='/glicemias' className={`flex flex-col items-center justify-center ${pathname === '/glicemias' ? 'text-primary' : 'text-foreground/40'} hover:text-primary/70 transition-colors`}>
          <FaFileLines size={20} />
          <span className="text-xs font-semibold">Glicemias</span>
        </Link>
        <Link href='/' className="mt-[-24px] flex flex-col items-center justify-center">
          <IoAddCircle className="text-primary bg-white rounded-full" size={56}/>
        </Link>
        <Link href='/glicemias' className={`flex flex-col items-center justify-center ${pathname === '/glicemias' ? 'text-primary' : 'text-foreground/40'} hover:text-primary/70 transition-colors`}>
          <FaFileLines size={20} />
          <span className="text-xs font-semibold">Glicemias</span>
        </Link>

      </div>
    </div>
  );
}