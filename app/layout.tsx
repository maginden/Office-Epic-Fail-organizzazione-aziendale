import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Office Epic Fails: Corporate Organization',
  description: 'Interactive presentation for Social Media Marketing students.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="it" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased bg-stone-50 text-stone-900">
        {children}
      </body>
    </html>
  );
}
