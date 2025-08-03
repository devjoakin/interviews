import type { Metadata } from 'next';
// import { Mona_Sans } from "next/font/google";
import localFont from 'next/font/local';
import './globals.css';

const babelFont = localFont({
  src: [
    { path: './fonts/Sequel-Bold.ttf' },
    { path: './fonts/Sequel-Regular.ttf' },
  ],
});

export const metadata: Metadata = {
  title: 'Babel Entrevistas',
  description: 'Plataformas de entrevistas generadas por IA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={`${babelFont.className} antialiased`}>{children}</body>
    </html>
  );
}
