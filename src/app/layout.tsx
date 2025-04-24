import './globals.css';
import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  title: 'Portfolio Profesional - Paola Hernandez Tarrega',
  description: 'Portfolio profesional para profesora de secundaria, mostrando experiencia, curriculum y recursos educativos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${merriweather.variable} font-sans antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          {/* Añadido pt-24 al contenido principal para evitar solapamiento con la barra de navegación fija */}
          <main className="flex-grow pt-24">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
