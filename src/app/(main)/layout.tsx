import Logo from "@/components/Logo";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6" >
      <Logo />
      {children}
    </div>
  );
}