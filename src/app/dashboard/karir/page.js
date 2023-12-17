'use client'

import LoaderFull from "@/components/loaderfull"
import { useUser } from "@clerk/nextjs"
import { Button } from "flowbite-react"
import Link from "next/link"
import useSWR from 'swr'

export default function DashboardKarir() {
  const { user } = useUser()
  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data: userData, error: userError, isLoading: userIsLoading } = useSWR(`/api/users/${user?.id}`, fetcher)

  return (
    <>
      <section className="sm:px-4 lg:px-6 xl:px-8">
        <div className="w-full p-6 bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow dark:bg-gray-800 dark:border-gray-700">
          {userData?.data?.schoolId && userData?.data?.schoolStatus == 'VERIFIED' ?
            <>
              <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Temukan Karirmu</h5>
              <p className="mb-5">
                <span className="text-[#fbb03b] font-bold">Ayo,</span> <span className="text-black font-bold">Mulai Sekarang!</span>
                <br />
                Dengan menjawab beberapa pertanyaan, kamu bisa mendapatkan rekomendasi karir yang sesuai dengan kepribadian, minat dan keahlianmu.
                <br />
              </p>
              <Link href="/dashboard/karir/tes" className="font-medium">
                <Button color="dark">
                  MULAI TES
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                </Button>
              </Link>
            </>
            :
            <>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kamu belum terhubung dengan sekolahmu!</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Cari sekolahmu dengan menekan tombol dibawah ini. Setelah itu kamu bisa menelusuri karir mu sepuasnya.</p>
              <Link href="/dashboard/sekolah" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none ">
                Sekolah saya
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
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
