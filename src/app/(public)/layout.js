import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata = {
  title: 'CareerPath',
  description: 'Selamat datang di CareerPath',
}

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}
