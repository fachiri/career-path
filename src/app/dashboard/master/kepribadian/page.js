"use client"

import { Formik } from "formik";
import { useState } from "react";
import { Table } from 'flowbite-react';
import useSWR from 'swr';
import SkeletonTable from "@/components/skeleton/table";

export default function MasterKepribadian() {
  const [alert, setAlert] = useState(null)
  const fetcher = (...args) => fetch(...args).then(res => res.json());

  const { data: personalityData, error: personalityError, isLoading: personalityLoading } = useSWR(`/api/master/personalities`, fetcher);

  return (
    <>
      <section className="sm:px-4 lg:px-6 xl:px-8">
        <div className="grid grid-cols-1 gap-5">
          <div className="w-full p-6 bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="relative overflow-x-auto">
              {personalityLoading ? <SkeletonTable /> :
                <Table striped>
                  <Table.Head className="border-b-2">
                    <Table.HeadCell>Kode</Table.HeadCell>
                    <Table.HeadCell>Kepribadian</Table.HeadCell>
                    {/* <Table.HeadCell>Aksi</Table.HeadCell> */}
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {personalityData?.data.map((personality, key) => (
                      <Table.Row key={key} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>{personality.code}</Table.Cell>
                        <Table.Cell>{personality.name}</Table.Cell>
                        {/* <Table.Cell>
                          <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                            Edit
                          </a>
                        </Table.Cell> */}
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              }
            </div>
          </div>
          {/* <div className="w-full p-6 bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow dark:bg-gray-800 dark:border-gray-700">
            <Formik
              initialValues={{ code: '', name: '', desc: '' }}
              validate={async values => {
                const errors = {};

                if (!values.code) {
                  errors.code = 'Kode kepribadian wajib diisi';
                }

                if (!values.name) {
                  errors.name = 'Nama kepribadian wajib diisi';
                }

                if (!values.desc) {
                  errors.desc = 'Deskripsi kepribadian wajib diisi';
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                  const response = await axios.post('/api/master/personalities', {
                    code: values.code,
                    name: values.name,
                    desc: values.desc,
                  })

                  setAlert({ color: 'success', message: response.data.message })
                } catch (error) {
                  setAlert({ color: 'failure', message: error.message })
                } finally {
                  setSubmitting(false)
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="w-full mb-3">
                    <label htmlFor="code" className="text-xs font-semibold text-gray-700 px-1">
                      Kode
                    </label>
                    <input
                      type="text"
                      name="code"
                      id="code"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.code}
                      className="w-full pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-black focus:ring-0"
                      placeholder="K01"
                    />
                    <small className='text-red-500'>{errors.code && touched.code && errors.code}</small>
                  </div>
                  <div className="w-full mb-3">
                    <label htmlFor="name" className="text-xs font-semibold text-gray-700 px-1">
                      Nama
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      className="w-full pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-black focus:ring-0"
                      placeholder="Realistik"
                    />
                    <small className='text-red-500'>{errors.name && touched.name && errors.name}</small>
                  </div>
                  <div className="grid place-content-end">
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Tambah
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div> */}
        </div>
      </section>
    </>
  )
}
