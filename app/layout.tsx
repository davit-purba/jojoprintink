import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import DrawerButton from '@/components/DrawerButton';
import Navbar from '@/components/header/Navbar';
import Providers from '@/components/Providers';
const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'PT.JOJO TIGA PUTRA JUNGJUNGAN',
  description: 'Printing Branding Advertising',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <div className='drawer'>
            <DrawerButton />
            <div className='drawer-content'>
              <div className='flex min-h-screen flex-col'>
                <Navbar />
                {children}
                {/* <Footer /> */}
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
