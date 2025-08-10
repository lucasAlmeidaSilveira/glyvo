import Logo from "@/components/Logo";
import Menu from "@/components/Menu";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6" >
      <div className="flex items-center justify-between gap-4">
        <Logo />
        <Menu />
      </div>
      {children}
    </div>
  );
}