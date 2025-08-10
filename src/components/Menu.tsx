import { IoMenu } from "react-icons/io5";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export default function Menu() {
  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button variant='secondary' size='icon' className="rounded-full">
          <IoMenu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}