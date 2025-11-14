import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsFileSpreadsheet } from 'react-icons/bs'
import { IoAddCircle } from 'react-icons/io5'
import { MdBloodtype } from 'react-icons/md'

import { useAuth } from '@/contexts/AuthContext'

export default function Navbar() {
  const pathname = usePathname()
  const { user } = useAuth()
  if (!user) return null

  return (
    <div className="bg-primary-foreground fixed bottom-0 flex w-full justify-center px-4 py-2 pb-7 shadow-md">
      <div className="mx-2 flex w-full justify-evenly">
        <Link
          href="/glicemias"
          className={`flex flex-col items-center justify-center ${pathname === '/glicemias' ? 'text-primary' : 'text-foreground/40'} hover:text-primary/70 transition-colors`}
        >
          <MdBloodtype size={20} />
          <span className="text-xs font-semibold">Glicemias</span>
        </Link>
        <Link
          href="/"
          className="mt-[-40px] flex flex-col items-center justify-center"
        >
          <IoAddCircle
            className="text-primary rounded-full bg-white"
            size={56}
          />
        </Link>
        <Link
          href="/spreadsheets"
          className={`flex flex-col items-center justify-center ${pathname === '/spreadsheets' ? 'text-primary' : 'text-foreground/40'} hover:text-primary/70 transition-colors`}
        >
          <BsFileSpreadsheet strokeWidth={0.3} size={20} />
          <span className="text-xs font-semibold">Planilhas</span>
        </Link>
      </div>
    </div>
  )
}
