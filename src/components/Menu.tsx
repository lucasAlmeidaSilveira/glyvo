'use client'

import { User } from 'firebase/auth'
import Link from 'next/link'
import { useState } from 'react'
import { FaFileLines } from 'react-icons/fa6'
import { ImExit } from 'react-icons/im'
import { IoClose, IoMenu } from 'react-icons/io5'

import Logo from './Logo'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

interface MenuProps {
  user: User | null
  logout: () => void
}

export default function Menu({ user, logout }: MenuProps) {
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <IoMenu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <SheetDescription asChild>
          <div className="mx-4 mt-2 flex flex-col items-end gap-4">
            <div className="flex flex-col items-end gap-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.photoURL || ''} />
                <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-end">
                <p className="text-sm font-semibold">{user?.displayName}</p>
                <p className="text-muted-foreground text-xs">{user?.email}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-1"
              >
                <Logo variant="icon" size={24} />
                <span className="text-lg font-semibold">Enviar glicemia</span>
              </Link>
              <Link
                href="/glicemias"
                onClick={() => setOpen(false)}
                className="flex items-center gap-1"
              >
                <FaFileLines
                  size={24}
                  className="bg-primary rounded-full p-1 text-white"
                />
                <span className="text-lg font-semibold">Glicemias</span>
              </Link>
            </div>
          </div>
        </SheetDescription>

        <SheetFooter>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <ImExit size={24} />
            Sair da conta
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
