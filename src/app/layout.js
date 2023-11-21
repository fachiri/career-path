import '@/assets/globals.css'
import '@/assets/style.css'
import '@/assets/custom.css'

import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        // baseTheme: [dark, neobrutalism],
        variables: { colorPrimary: 'black' },
        // signIn: {
        //   variables: { colorPrimary: 'black' }
        // }
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
