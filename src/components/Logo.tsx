import Image from 'next/image'

export default function Logo({
  variant = 'full',
  size = 180,
}: {
  variant?: 'full' | 'icon'
  size?: number
}) {
  return (
    <Image
      aria-hidden
      src={variant === 'full' ? '/logoFullWhite.svg' : '/logoIconPrimary.svg'}
      alt="Glyvo logo"
      width={size}
      height={size}
    />
  )
}
