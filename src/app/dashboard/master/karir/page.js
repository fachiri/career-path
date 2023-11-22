"use client"

import { Alert, Table, Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import axios from "axios"
import useSWR, { mutate } from 'swr';
import SkeletonTable from "@/components/skeleton/table";

export default function MasterKarir() {
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const [alert, setAlert] = useState(null)
  const [openModal, setOpenModal] = useState(undefined);
  const [isLoading, setIsLoading] = useState([])

  const { data: careerData, error: careerError, isLoading: careerLoading } = useSWR(`/api/master/careers`, fetcher);
  const { data: personalityData, error: personalityError, isLoading: personalityLoading } = useSWR(`/api/master/personalities`, fetcher);
  const { data: expertiseData, error: expertiseError, isLoading: expertiseLoading } = useSWR(`/api/master/expertices`, fetcher);

  const handleDelete = async (id) => {
    try {
      setIsLoading((prevLoading) => [...prevLoading, `handleDelete${id}`]);
      const response = await axios.delete(`/api/master/career/${id}`)
      setAlert({ color: 'success', message: response.data.message })
      mutate(`/api/master/careers`);
    } catch (error) {
      setAlert({ color: 'failure', message: error.message })
    } finally {
      setOpenModal(undefined)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsLoading((prevLoading) => prevLoading.filter(item => item !== `handleDelete${id}`));
    }
  }

  return (
    <>
      <section className="sm:px-4 lg:px-6 xl:px-8">
        <div className="grid grid-cols-1 gap-5">
          {alert && (
            <div className="mb-3 px-6">
              <Alert color={alert.color} onDismiss={() => setAlert(null)}>
                <div dangerouslySetInnerHTML={{ __html: alert.message }} />
              </Alert>
            </div>
          )}
          <div className="w-full p-6 bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="relative overflow-x-auto">
              {careerLoading ? <SkeletonTable /> :
                <Table striped>
                  <Table.Head className="border-b-2">
                    <Table.HeadCell>Kode</Table.HeadCell>
                    <Table.HeadCell>Karir</Table.HeadCell>
                    <Table.HeadCell>Kepribadian</Table.HeadCell>
                    <Table.HeadCell>Keahlian</Table.HeadCell>
                    <Table.HeadCell>Aksi</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {careerData?.data?.map((career, key) => (
                      <Table.Row key={key} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>{career.code}</Table.Cell>
                        <Table.Cell>{career.name}</Table.Cell>
                        <Table.Cell>{career.personality?.name}</Table.Cell>
                        <Table.Cell>{career.expertise?.name}</Table.Cell>
                        <Table.Cell className="space-x-2 whitespace-nowrap">
                          <button onClick={() => setOpenModal(`modal-edit-${career.id}`)} className="font-medium text-cyan-600 dark:text-cyan-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </button>
                          <Modal show={openModal === `modal-edit-${career.id}` ? true : false} onClose={() => setOpenModal(undefined)}>
                            <Modal.Header>Edit Data</Modal.Header>
                            <Modal.Body>
                              <Formik
                                initialValues={{ code: career.code, name: career.name, personalityId: career.personality?.id, expertiseId: career.expertise?.id }}
                                validate={async values => {
                                  const errors = {};

                                  if (!values.code) {
                                    errors.code = 'Kode Karir wajib diisi';
                                  }

                                  if (!values.name) {
                                    errors.name = 'Nama Karir wajib diisi';
                                  }

                                  if (!values.personalityId) {
                                    errors.personalityId = 'Jenis Kepribadian harus dipilih';
                                  }

                                  if (!values.expertiseId) {
                                    errors.expertiseId = 'Jenis Keahlian harus dipilih';
                                  }

                                  return errors;
                                }}
                                onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
                                  try {
                                    const response = await axios.put(`/api/master/career/${career.id}`, values)
                                    setAlert({ color: 'success', message: response.data.message })
                                    mutate(`/api/master/careers`);
                                  } catch (error) {
                                    setAlert({ color: 'failure', message: error.message })
                                  } finally {
                                    setSubmitting(false)
                                    setOpenModal(undefined)
                                    resetForm();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }
                                }}
                              >
                                {({ isSubmitting }) => (
                                  <Form>
                                    <div className="w-full mb-3">
                                      <label htmlFor="code" className="text-xs font-semibold text-gray-700 px-1">
                                        Kode Karir
                                      </label>
                                      <Field type="text" name="code" id="code" placeholder="cth. KK01" className="w-full pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-black focus:ring-0" />
                                      <ErrorMessage name="code" component="small" className="text-red-500" />
                                    </div>
                                    <div className="w-full mb-3">
                                      <label htmlFor="name" className="text-xs font-semibold text-gray-700 px-1">
                                        Nama Karir
                                      </label>
                                      <Field type="text" name="name" id="name" placeholder="cth. Teknisi Komputer" className="w-full pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-black focus:ring-0" />
                                      <ErrorMessage name="name" component="small" className="text-red-500" />
                                    </div>
                                    <div className="w-full mb-3">
                                      <label htmlFor="name" className="text-xs font-semibold text-gray-700 px-1">
                                        Jenis Kepribadian
                                      </label>
                                      <Field as="select" name="personalityId" className="w-full pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-black focus:ring-0">
                                        <option value="" hidden>-- Pilih Jenis Kepribadian --</option>
                                        {personalityData?.data.map((personality, key) => (
                                          <option key={key} value={personality.id}>{personality.name}</option>
                                        ))}
                                      </Field>
                                      <ErrorMessage name="personalityId" component="small" className="text-red-500" />
                                    </div>
                                    <div className="w-full mb-5">
                                      <label htmlFor="expertiseId" className="text-xs font-semibold text-gray-700 px-1">
                                        Keahlian
                                      </label>
                                      <Field as="select" name="expertiseId" className="w-full pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-black focus:ring-0">
                                        <option value="" hidden>-- Pilih Jenis Keahlian --</option>
                                        {expertiseData?.data.map((expertise, key) => (
                                          <option key={key} value={expertise.id}>{expertise.name}</option>
                                        ))}
                                      </Field>
                                      <ErrorMessage name="expertiseId" component="small" className="text-red-500" />
                                    </div>
                                    <div className="grid place-content-end">
                                      <Button type="submit" disabled={isSubmitting}>Submit</Button>
                                    </div>
                                  </Form>
                                )}
                              </Formik>
                            </Modal.Body>
                          </Modal>
                          <button onClick={() => setOpenModal(`modal-${career.id}`)} className="font-medium text-red-600 dark:text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                          <Modal show={openModal === `modal-${career.id}` ? true : false} size="md" onClose={() => setOpenModal(undefined)} popup>
                            <Modal.Header />
                            <Modal.Body>
                              <div className="text-center">
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                  Hapus data <b>{career.name}</b>?
                                </h3>
                                <div className="flex justify-center gap-4">
                                  <Button color="failure" onClick={() => handleDelete(career.id)} disabled={isLoading.includes(`handleDelete${career.id}`) ? true : false}>
                                    Ya, hapus
                                  </Button>
                                  <Button color="gray" onClick={() => setOpenModal(undefined)}>
                                    Tidak jadi
                                  </Button>
                                </div>
                              </div>
                            </Modal.Body>
                          </Modal>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              }
            </div>
          </div>
          <div className="w-full p-6 bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow dark:bg-gray-800 dark:border-gray-700">
            <Formik
              initialValues={{ code: '', name: '', personalityId: '', expertiseId: '' }}
              validate={async values => {
                const errors = {};

                if (!values.code) {
                  errors.code = 'Kode Karir wajib diisi';
                }

                if (!values.name) {
                  errors.name = 'Nama Karir wajib diisi';
                }

                if (!values.personalityId) {
                  errors.personalityId = 'Jenis Kepribadian harus dipilih';
                }

                if (!values.expertiseId) {
                  errors.expertiseId = 'Jenis Keahlian harus dipilih';
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
                try {
                  const response = await axios.post('/api/master/careers', values)

                  setAlert({ color: 'success', message: response.data.message })
                  mutate(`/api/master/careers`);
                } catch (error) {
                  setAlert({ color: 'failure', message: error.message })
                } finally {
                  setSubmitting(false)
                  resetForm();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="w-full mb-3">
                    <label htmlFor="code" className="text-xs font-semibold text-gray-700 px-1">
                      Kode Karir
                    </label>
                    <Field type="text" name="code" id="code" placeholder="cth. KK01" className="w-full pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-black focus:ring-0" />
                    <ErrorMessage name="code" component="small" className="text-red-500" />
                  </div>
                  <div className="w-full mb-3">
                    <label htmlFor="name" className="text-xs font-semibold text-gray-700 px-1">
                      Nama Karir
                    </label>
                    <Field type="text" name="name" id="name" placeholder="cth. Teknisi Komputer" className="w-full pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-black focus:ring-0" />
                    <ErrorMessage name="name" component="small" className="text-red-500" />
                  </div>
                  <div className="w-full mb-3">
                    <label htmlFor="name" className="text-xs font-semibold text-gray-700 px-1">
                      Jenis Kepribadian
                    </label>
                    <Field as="select" name="personalityId" className="w-full pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-black focus:ring-0">
                      <option value="" hidden>-- Pilih Jenis Kepribadian --</option>
                      {personalityData?.data.map((personality, key) => (
                        <option key={key} value={personality.id}>{personality.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="personalityId" component="small" className="text-red-500" />
                  </div>
                  <div className="w-full mb-5">
                    <label htmlFor="expertiseId" className="text-xs font-semibold text-gray-700 px-1">
                      Keahlian
                    </label>
                    <Field as="select" name="expertiseId" className="w-full pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-black focus:ring-0">
                      <option value="" hidden>-- Pilih Jenis Keahlian --</option>
                      {expertiseData?.data.map((expertise, key) => (
                        <option key={key} value={expertise.id}>{expertise.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="expertiseId" component="small" className="text-red-500" />
                  </div>
                  <div className="grid place-content-end">
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      color='dark'
                    >
                      Tambah
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  )
}
