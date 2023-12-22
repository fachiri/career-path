"use client"

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import { Alert, Table, Button, Modal, Badge } from "flowbite-react";
import { useState } from "react";
import axios from "axios"
import useSWR, { mutate } from 'swr';
import SkeletonTable from "@/components/skeleton/table";
import Select from 'react-select'

export default function MasterPengguna() {
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const [alert, setAlert] = useState(null)
  const [openModal, setOpenModal] = useState(undefined);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState([])
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  const { data: userData, error: userError, isLoading: userLoading } = useSWR(`/api/master/users`, fetcher);

  const handleConfirm = async (id, role) => {
    try {
      setIsLoading((prevLoading) => [...prevLoading, `handleConfirm${id}`]);
      const response = await axios.put(`/api/master/user/confirm/${id}`, { role })
      setAlert({ color: 'success', message: response.data.message })
      mutate(`/api/master/users`);
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
        <div className="grid grid-cols-1 gap-5">
          {alert && (
            <div className="mb-3 px-4 sm:px-0">
              <Alert color={alert.color} onDismiss={() => setAlert(null)}>
                <div dangerouslySetInnerHTML={{ __html: alert.message }} />
              </Alert>
            </div>
          )}
          <div className="w-full p-6 bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="relative overflow-x-auto">
              {userLoading ? <SkeletonTable /> :
                <Table striped>
                  <Table.Head className="border-b-2">
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                    <Table.HeadCell>Nama</Table.HeadCell>
                    <Table.HeadCell>Sekolah</Table.HeadCell>
                    <Table.HeadCell>Aksi</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {userData?.data?.map((user, key) => (
                      <Table.Row key={key} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                          <Badge className="w-fit" color={user.schoolStatus == 'PENDING' ? 'warning' : user.schoolStatus == 'VERIFIED' ? 'success' : 'gray'}>{user.schoolStatus}</Badge>
                        </Table.Cell>
                        <Table.Cell>{user.pendingRole}</Table.Cell>
                        <Table.Cell>{user.firstName} {user.lastName}</Table.Cell>
                        <Table.Cell>{user.schoolName}</Table.Cell>
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
                                  <dt className="mb-1 text-gray-500 dark:text-gray-400">NPSN</dt>
                                  <dd className="font-semibold">{user.npsn}</dd>
                                </div>
                                <div className="flex flex-col py-3">
                                  <dt className="mb-1 text-gray-500 dark:text-gray-400">Sekolah</dt>
                                  <dd className="font-semibold">{user.schoolName}</dd>
                                </div>
                                <div className="flex flex-col py-3">
                                  <dt className="mb-1 text-gray-500 dark:text-gray-400">Surat Keterangan</dt>
                                  <dd className="font-semibold">
                                    <div className='w-full'>
                                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                        <Viewer fileUrl={`/uploads/sk/${user.sk}`} plugins={[defaultLayoutPluginInstance]} />
                                      </Worker>
                                    </div>
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
                                      Konfirmasi bahwa <b>{user.firstName} {user.lastName}</b> merupakan <b>{user.pendingRole}</b> di <b>{user.schoolName}</b>?
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
          </div>
        </div>
      </section>
    </>
  )
}
