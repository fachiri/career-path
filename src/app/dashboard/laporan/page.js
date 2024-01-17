'use client'

import LoaderFull from "@/components/loaderfull"
import SkeletonTable from "@/components/skeleton/table"
import { useUser } from "@clerk/nextjs"
import { Alert, Badge, Button, Modal, Table } from "flowbite-react"
import Link from "next/link"
import { useState } from "react"
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

  return (
    <>
      <section className="sm:px-4 lg:px-6 xl:px-8">
        {alert && (
          <div className="mb-3 px-4 sm:px-0">
            <Alert color={alert.color} onDismiss={() => setAlert(null)}>
              <div dangerouslySetInnerHTML={{ __html: alert.message }} />
            </Alert>
          </div>
        )}
        <div className="w-full p-6 bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow dark:bg-gray-800 dark:border-gray-700">
          {userData?.data?.schoolId && userData?.data?.schoolStatus == 'VERIFIED' ?
            <>
              <div className="flex justify-between mb-5">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Laporan Karir Siswa</h5>
                <Link href="/export">
                  <Button color="dark">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    Unduh PDF
                  </Button>
                </Link>
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
                      <Table.HeadCell>Aksi</Table.HeadCell>
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
                          <Table.Cell className="space-x-2 whitespace-nowrap">
                            <button onClick={() => setOpenModal(`modal-detail-${user.id}`)} className="font-medium text-cyan-600 dark:text-cyan-500">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                              </svg>
                            </button>
                            <Modal show={openModal === `modal-detail-${user.id}` ? true : false} onClose={() => setOpenModal(undefined)}>
                              <Modal.Header>Detail {user.firstName} {user.lastName}</Modal.Header>
                              <Modal.Body>
                                <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                  <div className="flex flex-col pb-3">
                                    <dt className="mb-1 text-gray-500 dark:text-gray-400">Nama Lengkap</dt>
                                    <dd className="font-semibold">{user.firstName} {user.lastName}</dd>
                                  </div>
                                  <div className="flex flex-col py-3">
                                    <dt className="mb-1 text-gray-500 dark:text-gray-400">Email</dt>
                                    <dd className="font-semibold">{user.email}</dd>
                                  </div>
                                  <div className="flex flex-col py-3">
                                    <dt className="mb-1 text-gray-500 dark:text-gray-400">Kepribadian</dt>
                                    <dd className="font-semibold">
                                      {user.careers.map((item, key) => (
                                        <div key={key}>{item?.career?.personality?.name}</div>
                                      ))}
                                    </dd>
                                  </div>
                                  <div className="flex flex-col py-3">
                                    <dt className="mb-1 text-gray-500 dark:text-gray-400">Keahlian</dt>
                                    <dd className="font-semibold">
                                      {user.careers.map((item, key) => (
                                        <div key={key}>{item?.career?.expertise?.name}</div>
                                      ))}
                                    </dd>
                                  </div>
                                  <div className="flex flex-col py-3">
                                    <dt className="mb-1 text-gray-500 dark:text-gray-400">Rekomendasi Karir</dt>
                                    <dd className="font-semibold">
                                      {user.careers.map((item, key) => (
                                        <div key={key}>{item?.career?.name}</div>
                                      ))}
                                    </dd>
                                  </div>
                                </dl>
                              </Modal.Body>
                            </Modal>
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
