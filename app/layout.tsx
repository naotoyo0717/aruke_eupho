// layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/app/components/navigation/Navigation'
import AuthContext from '@/app/context/AuthContext'
import SignupModal from '@/app/components/modals/SignupModal'
import LoginModal from '@/app/components/modals/LoginModal'
import ProfileModal from '@/app/components/modals/ProfileModal'
import getCurrentUser from '@/app/actions/getCurrentUser'
import ToasterContext from '@/app/context/ToasterContext'
import Footer from './components/footer/Footer'
import { VisitedCounterProvider } from '@/app/context/VisitedCounterContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Prisma Auth',
  description: 'Prisma Auth',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
            <VisitedCounterProvider>
              <SignupModal />
              <LoginModal />
              <ProfileModal currentUser={currentUser} />
              <Navigation currentUser={currentUser} />
              <div className='flex min-h-screen flex-col'>
                <main className='container mx-auto max-w-screen-sm flex-1 px-1 py-5'>
                  {children}
                </main>
                <Footer />
              </div>
            </VisitedCounterProvider>
        </AuthContext>
      </body>
    </html>
  )
}
