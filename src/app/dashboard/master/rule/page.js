"use client"

import { Alert, Table, Button, Modal } from "flowbite-react";
import { useState } from "react";
import axios from "axios"
import useSWR, { mutate } from 'swr';
import SkeletonTable from "@/components/skeleton/table";
import Select from 'react-select'

export default function MasterPernyataan() {
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const [alert, setAlert] = useState(null)
  const [openModal, setOpenModal] = useState(undefined);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState([])

  const { data: careerData, error: careerError, isLoading: careerLoading } = useSWR(`/api/master/careers`, fetcher);
  const { data: statementData, error: statementError, isLoading: statementLoading } = useSWR(`/api/master/statements`, fetcher);

  const getOptions = (statements, rules) => {
    let options = []

    statements.forEach(statement => {
      if (!rules.some(rule => rule.statement.code === statement.code)) {
        options.push({
          value: statement.id,
          label: `${statement.code} - ${statement.desc}`
        })
      }
    });

    return options
  }

  const handleChangeRule = async (e, careerId) => {
    try {
      e.preventDefault()
      setIsLoading((prevLoading) => [...prevLoading, `handleChangeRule${careerId}`]);

      const response = await axios.post(`/api/master/rules`, {
        careerId,
        statementId: selectedOption.value
      })

      setAlert({ color: 'success', message: response.data.message })
      mutate(`/api/master/careers`);
    } catch (error) {
      setAlert({ color: 'failure', message: error.message })
    } finally {
      setOpenModal(undefined)
      setSelectedOption(null)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsLoading((prevLoading) => prevLoading.filter(item => item !== `handleChangeRule${careerId}`));
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
                    <Table.HeadCell>Kode Karir</Table.HeadCell>
                    <Table.HeadCell>Rules</Table.HeadCell>
                    <Table.HeadCell>Aksi</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {careerData?.data?.map((career, key) => (
                      <Table.Row key={key} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>{career.code}</Table.Cell>
                        <Table.Cell className="flex flex-wrap">
                          {career.rules.map((rule, key) => (
                            <span key={key}>
                              {key === 0 ? <small>IF</small> : null}
                              <span className="font-medium mx-2">{rule.statement.code}</span>
                              {key !== career.rules.length - 1 ?
                                <small>AND</small> :
                                <>
                                  <small>THEN</small>
                                  <span className="font-medium ml-2">{career.code}</span>
                                </>
                              }
                            </span>
                          ))}
                        </Table.Cell>
                        <Table.Cell className="space-x-2 whitespace-nowrap">
                          <button onClick={() => setOpenModal(`modal-edit-${career.id}`)} className="font-medium text-gray-600 dark:text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                          <Modal show={openModal === `modal-edit-${career.id}` ? true : false} onClose={() => setOpenModal(undefined)} className="overflow-y-auto">
                            <Modal.Header>Edit Rule {career.code}</Modal.Header>
                            <Modal.Body>
                              <form onSubmit={(e) => handleChangeRule(e, career.id)} className="pb-52">
                                <div className="w-full mb-5">
                                  <label htmlFor="name" className="text-xs font-semibold text-gray-700 px-1">
                                    Kode Pernyataan / Fakta
                                  </label>
                                  <Select
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={getOptions(statementData?.data, career.rules)}
                                  />
                                </div>
                                <div className="grid place-content-end">
                                  <Button type="submit" disabled={isLoading.includes(`handleChangeRule${career.id}`) ? true : false}>Submit</Button>
                                </div>
                              </form>
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
        </div>
      </section>
    </>
  )
}
