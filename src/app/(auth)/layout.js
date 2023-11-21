import '@/assets/globals.css'
import '@/assets/style.css'
import '@/assets/custom.css'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/logo.svg'

export const metadata = {
  title: 'CareerPath',
  description: 'Selamat datang di CareerPath',
}

export default function RootLayout({ children }) {
  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-2/3 h-screen fixed top-0 overflow-hidden">
        <img
          src="https://source.unsplash.com/random"
          alt="Background Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="fixed right-0 overflow-x-scroll bg-white w-full md:max-w-md lg:max-w-full md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-start justify-center"
      >
        <div className="w-full h-100 py-10">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo CareerPath"
              width={150}
              height={50}
              className="mb-10"
            />
          </Link>
          <main>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
