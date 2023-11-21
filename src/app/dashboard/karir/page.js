'use client'

import LoaderFull from "@/components/loaderfull"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import useSWR from 'swr'

export default function DashboardKarir() {
  const { user } = useUser()
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error, isLoading } = useSWR(`/api/users/${user?.id}`, fetcher)

  if (isLoading) {
    return <LoaderFull />
  }

  return (
    <>
      <section className="sm:px-4 lg:px-6 xl:px-8">
        <div className="w-full p-6 bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow dark:bg-gray-800 dark:border-gray-700">
          {data?.data?.user?.schoolId && data?.data?.user?.schoolStatus == 'VERIFIED' ?
            <>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Tes Karir Sekarang</h5>
            </>
            :
            <>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kamu belum terhubung dengan sekolahmu!</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Cari sekolahmu dengan menekan tombol dibawah ini. Setelah itu kamu bisa menelusuri karir mu sepuasnya.</p>
              <Link href="/dashboard/sekolah" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Sekolah saya
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Link>
            </>
          }
        </div>

      </section>
    </>
  )
}
