import Sidebar from '@/components/sidebar'

export const metadata = {
  title: 'Dashboard | CareerPath',
  description: 'Selamat datang di Dashboard CareerPath',
}

export default function RootLayout({ children }) {
  return (
    <>
      <div className='relative'>
        <Sidebar />
        <main className="sm:px-2 sm:ml-64">
          <div className="pt-20 pb-4">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
