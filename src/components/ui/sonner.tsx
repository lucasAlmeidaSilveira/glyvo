'use client';

import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className='toaster group'
      position='top-center'
      toastOptions={{
        style: {
          backgroundColor: 'white',
          color: 'var(--foreground)',
        },
      }}
      richColors
      {...props}
    />
  );
};

export { Toaster };
