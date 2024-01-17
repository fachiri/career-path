'use client'

import LoaderFull from "@/components/loaderfull"
import SkeletonTable from "@/components/skeleton/table"
import { useUser } from "@clerk/nextjs"
import { Alert, Badge, Button, Modal, Table } from "flowbite-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import useSWR, { mutate } from 'swr'
import axios from 'axios'

export default function DashboardLaporan() {
  const { user } = useUser()
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const [isLoading, setIsLoading] = useState([])
  const [openModal, setOpenModal] = useState(undefined);
  const [alert, setAlert] = useState(null)

  const { data: userData, error: userError, isLoading: userIsLoading } = useSWR(`/api/users/${user?.id}`, fetcher)
  const { data: studentsData, error: studentsError, isLoading: studentsIsLoading } = useSWR(`/api/schools/siswa/${userData?.data?.schoolId}`, fetcher)

  useEffect(() => {
    window.print()
  }, [])

  return (
    <>
      <section>
        {alert && (
          <div className="mb-3 px-4 sm:px-0">
            <Alert color={alert.color} onDismiss={() => setAlert(null)}>
              <div dangerouslySetInnerHTML={{ __html: alert.message }} />
            </Alert>
          </div>
        )}
        <div className="w-full p-6 bg-white">
          {userData?.data?.schoolId && userData?.data?.schoolStatus == 'VERIFIED' ?
            <>
              <div className="flex justify-center mb-5">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Laporan Karir Siswa</h5>
              </div>
              <div className="relative overflow-x-auto">
                {studentsIsLoading ? <SkeletonTable /> :
                  <Table striped>
                    <Table.Head className="border-b-2">
                      <Table.HeadCell>Status</Table.HeadCell>
                      <Table.HeadCell>Nama</Table.HeadCell>
                      <Table.HeadCell>Kepribadian</Table.HeadCell>
                      <Table.HeadCell>Keahlian</Table.HeadCell>
                      <Table.HeadCell>Karir</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {studentsData?.data?.map((user, key) => (
                        <Table.Row key={key} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell>
                            <Badge className="w-fit" color={user.schoolStatus == 'PENDING' ? 'warning' : user.schoolStatus == 'VERIFIED' ? 'success' : 'gray'}>{user.schoolStatus}</Badge>
                          </Table.Cell>
                          <Table.Cell>{user.firstName} {user.lastName}</Table.Cell>
                          <Table.Cell>
                            {user.careers.map((item, key) => (
                              <div key={key}>{item?.career?.personality?.name}</div>
                            ))}
                          </Table.Cell>
                          <Table.Cell>
                            {user.careers.map((item, key) => (
                              <div key={key}>{item?.career?.expertise?.name}</div>
                            ))}
                          </Table.Cell>
                          <Table.Cell>
                            {user.careers.map((item, key) => (
                              <div key={key}>{item?.career?.name}</div>
                            ))}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                }
              </div>
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
