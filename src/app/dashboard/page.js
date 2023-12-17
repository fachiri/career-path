'use client'

import { useState } from "react";
import { Table } from 'flowbite-react';
import useSWR from 'swr';
import SkeletonTable from "@/components/skeleton/table";

export default function Home() {
  const [alert, setAlert] = useState(null)
  const fetcher = (...args) => fetch(...args).then(res => res.json());

  const { data: personalityData, error: personalityError, isLoading: personalityLoading } = useSWR(`/api/master/personalities`, fetcher);
  const { data: dashboardData, error: dashboardError, isLoading: dashboardLoading } = useSWR(`/api/dashboard`, fetcher);

  return (
    <>
      <section className="sm:px-4 lg:px-6 xl:px-8">
        <div className="w-full bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow dark:bg-gray-800 dark:border-gray-700 mb-6">
          <div className="flex items-center">
            <div className="basis-1/4 flex flex-col items-center justify-center transition-colors hover:bg-gray-100 py-5 border-r">
              <div className="flex flex-row items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-[#fbb03b] mr-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <span className="font-bold text-black text-xl">{dashboardData?.data?.siswaCount}</span>
              </div>
              <div className="mt-2 text-lg text-gray-400">Siswa</div>
            </div>
            <div className="basis-1/4 flex flex-col items-center justify-center transition-colors hover:bg-gray-100 py-5 border-r">
              <div className="flex flex-row items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-[#fbb03b] mr-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <span className="font-bold text-black text-xl">{dashboardData?.data?.guruCount}</span>
              </div>
              <div className="mt-2 text-lg text-gray-400">Guru</div>
            </div>
            <div className="basis-1/4 flex flex-col items-center justify-center transition-colors hover:bg-gray-100 py-5 border-r">
              <div className="flex flex-row items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-[#fbb03b] mr-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <span className="font-bold text-black text-xl">{dashboardData?.data?.kepsekCount}</span>
              </div>
              <div className="mt-2 text-lg text-gray-400">Kepsek</div>
            </div>
            <div className="basis-1/4 flex flex-col items-center justify-center transition-colors hover:bg-gray-100 py-5">
              <div className="flex flex-row items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-[#fbb03b] mr-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
                <span className="font-bold text-black text-xl">{dashboardData?.data?.sekolahCount}</span>
              </div>
              <div className="mt-2 text-lg text-gray-400">Sekolah</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5">
          <div className="w-full p-6 bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="relative overflow-x-auto">
              {personalityLoading ? <SkeletonTable /> :
                <Table striped>
                  <Table.Head className="border-b-2">
                    <Table.HeadCell>Kepribadian</Table.HeadCell>
                    <Table.HeadCell>Deskripsi</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {personalityData?.data.map((personality, key) => (
                      <Table.Row key={key} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="align-top">{personality.name}</Table.Cell>
                        <Table.Cell>{personality.desc}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
