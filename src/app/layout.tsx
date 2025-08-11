import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Glyvo - Controle fácil, vida leve',
  description:
    'Organize suas medições de glicose de forma simples, rápida e segura. Ideal para quem precisa acompanhar o controle glicêmico no dia a dia e compartilhar resultados com médicos.',
  keywords:
    'app de glicemia, controle de glicose, diário glicêmico, aplicativo diabetes, registro de glicemia, PDF glicemia, monitor glicêmico digital',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang='pt-BR' className={poppins.variable} suppressHydrationWarning>
        <body
          className={'font-sans bg-gradient-to-b from-[#3454D1] to-[#2843AF]'}
        >
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
