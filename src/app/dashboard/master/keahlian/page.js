"use client"

import { Table } from "flowbite-react";
import { Formik } from "formik";
import { useState } from "react";

export default function MasterKeahlian() {
  const [alert, setAlert] = useState(null)

  return (
    <>
      <section className="sm:px-4 lg:px-6 xl:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <div className="w-full p-6 bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="relative overflow-x-auto">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>Kode</Table.HeadCell>
                  <Table.HeadCell>Kepribadian</Table.HeadCell>
                  <Table.HeadCell>Ciri-Ciri</Table.HeadCell>
                  <Table.HeadCell>
                    <span className="sr-only">Edit</span>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>Sliver</Table.Cell>
                    <Table.Cell>Laptop</Table.Cell>
                    <Table.Cell>$2999</Table.Cell>
                    <Table.Cell>
                      <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        Edit
                      </a>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>White</Table.Cell>
                    <Table.Cell>Laptop PC</Table.Cell>
                    <Table.Cell>$1999</Table.Cell>
                    <Table.Cell>
                      <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        Edit
                      </a>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>Black</Table.Cell>
                    <Table.Cell>Accessories</Table.Cell>
                    <Table.Cell>$99</Table.Cell>
                    <Table.Cell>
                      <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        Edit
                      </a>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>Gray</Table.Cell>
                    <Table.Cell>Phone</Table.Cell>
                    <Table.Cell>$799</Table.Cell>
                    <Table.Cell>
                      <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        Edit
                      </a>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>Red</Table.Cell>
                    <Table.Cell>Wearables</Table.Cell>
                    <Table.Cell>$999</Table.Cell>
                    <Table.Cell>
                      <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        Edit
                      </a>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
          <div className="w-full p-6 bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow dark:bg-gray-800 dark:border-gray-700">
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
          </div>
        </div>
      </section>
    </>
  )
}
