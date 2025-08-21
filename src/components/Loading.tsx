export default function Loading({ color = 'white' }: { color?: string }) {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-3'>
      <img src='/logoIconPrimary.svg' alt='Logo' className='animate-spin' />
      <p className={`text-${color} text-md animate-pulse`}>Carregando...</p>
    </div>
  );
}
