import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar';
import globals from '../styles/globals.module.scss';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth';
import Provider from '@/components/Provider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <Provider>
        <body className={globals.container} suppressHydrationWarning={true}>
          {
            session ?
              <div className="hidden md:block lg:block xl:block"> <Navbar /></div>
              : ''
          }

          {children}
        </body>
      </Provider>

    </html>
  )
}