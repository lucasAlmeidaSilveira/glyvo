import Image from 'next/image';

export default function Logo({ variant = 'full' }: { variant?: 'full' | 'icon' }) {
  return (
    <Image
      aria-hidden
      src={variant === 'full' ? '/logoFullWhite.svg' : '/logoIconPrimary.svg'}
      alt='Glyvo logo'
      width={180}
      height={56}
    />
  );
}
