import type {Metadata} from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  weight: ['500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'dibantu.id — Digital Agency for Students, UMKM & Startups',
  description: 'Web Development, Logo Design, Academic Writing, Research Proposal, dan Graphic Design dalam satu tim. Cepat, rapi, dan profesional.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="bg-bg text-ink font-body antialiased noise transition-colors duration-400">
        {children}
      </body>
    </html>
  );
}
