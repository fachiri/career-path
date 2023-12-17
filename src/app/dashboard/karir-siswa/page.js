'use client'

import LoaderFull from "@/components/loaderfull"
import SkeletonTable from "@/components/skeleton/table"
import { useUser } from "@clerk/nextjs"
import { Alert, Badge, Button, Modal, Table } from "flowbite-react"
import Link from "next/link"
import { useState } from "react"
import useSWR, { mutate } from 'swr'
import axios from 'axios'

export default function DashboardKarir() {
  const { user } = useUser()
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const [isLoading, setIsLoading] = useState([])
  const [openModal, setOpenModal] = useState(undefined);
  const [alert, setAlert] = useState(null)

  const { data: userData, error: userError, isLoading: userIsLoading } = useSWR(`/api/users/${user?.id}`, fetcher)
  const { data: studentsData, error: studentsError, isLoading: studentsIsLoading } = useSWR(`/api/schools/siswa/${userData?.data?.schoolId}`, fetcher)

  const handleConfirm = async (id, role) => {
    try {
      setIsLoading((prevLoading) => [...prevLoading, `handleConfirm${id}`]);
      const response = await axios.put(`/api/master/user/confirm/${id}`, { role })
      setAlert({ color: 'success', message: response.data.message })
      mutate(`/api/schools/siswa/${userData?.data?.schoolId}`);
    } catch (error) {
      setAlert({ color: 'failure', message: error.message })
    } finally {
      setOpenModal(undefined)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsLoading((prevLoading) => prevLoading.filter(item => item !== `handleConfirm${id}`));
    }
  }

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
              <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Siswa</h5>
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
                            {user.schoolStatus == 'PENDING' ?
                              <>
                                <button onClick={() => setOpenModal(`modal-confirm-${user.id}`)} className="font-medium text-green-600 dark:text-green-500">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </button>
                                <Modal show={openModal === `modal-confirm-${user.id}` ? true : false} size="md" onClose={() => setOpenModal(undefined)} popup>
                                  <Modal.Header />
                                  <Modal.Body>
                                    <div className="text-center">
                                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Konfirmasi bahwa <b>{user.firstName} {user.lastName}</b> merupakan <b>{user.pendingRole}</b> sekolah ini?
                                      </h3>
                                      <div className="flex justify-center gap-4">
                                        <Button color="success" onClick={() => handleConfirm(user.id, user.pendingRole)} disabled={isLoading.includes(`handleConfirm${user.id}`) ? true : false}>
                                          Ya, konfirmasi
                                        </Button>
                                        <Button color="gray" onClick={() => setOpenModal(undefined)}>
                                          Tidak jadi
                                        </Button>
                                      </div>
                                    </div>
                                  </Modal.Body>
                                </Modal>
                              </>
                              : null
                            }
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
