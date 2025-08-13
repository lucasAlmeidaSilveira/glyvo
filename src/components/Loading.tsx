export default function Loading({ color = 'white' }: { color?: string }) {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-6'>
    <div className={`animate-spin rounded-full h-12 w-12 border-b-2 border-${color}`}></div>
    <p className={`text-${color} text-lg`}>Carregando...</p>
  </div>
  );
}