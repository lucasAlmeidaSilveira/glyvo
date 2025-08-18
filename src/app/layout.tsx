import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Analytics } from "@vercel/analytics/next"
import { InstallBanner } from '@/components/InstallBanner';

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
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Glyvo',
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Glyvo',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#3454D1',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang='pt-BR' className={poppins.variable} suppressHydrationWarning>
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/logo-180.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/logo-152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/logo-180.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/icons/logo-167.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Glyvo" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#3454D1" />
          <meta name="msapplication-TileColor" content="#3454D1" />
          <meta name="msapplication-TileImage" content="/logoIconPrimary.svg" />
        </head>
        <body
          className={'font-sans bg-gradient-to-b from-[#3454D1] to-[#2843AF]'}
        >
          {children}
          <Analytics />
          <InstallBanner />
        </body>
      </html>
    </AuthProvider>
  );
}
