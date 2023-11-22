'use client'

import LoaderFull from "@/components/loaderfull"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { Button, Label, Radio, Table } from "flowbite-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import useSWR from 'swr'

export default function DashboardTesKarir() {
  const { user } = useUser()
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const [facts, setFacts] = useState({})
  const [index, setIndex] = useState(0)
  const [statements, setStatements] = useState([])
  const [careers, setCareers] = useState([])

  const { data: userData, error: userError, isLoading: userIsLoading } = useSWR(`/api/users/${user?.id}`, fetcher)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const { data: testData } = await axios.post('/api/careers/test', { facts, index })

      setStatements(testData.data.statements)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      const formData = new FormData(e.target);
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      const newFacts = { ...facts, ...formDataObject };
      const newIndex = index + 1;

      setFacts(newFacts);
      setIndex(newIndex);

      const { data: testData } = await axios.post('/api/careers/test', { facts: newFacts, index: newIndex })

      setStatements(testData.data.statements)
      setCareers(testData.data.careers)
      console.log()
      e.target.reset();
    } catch (error) {

    }
  }

  return (
    <>
      <section className="sm:px-4 lg:px-6 xl:px-8">
        <div className="w-full p-6 bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow dark:bg-gray-800 dark:border-gray-700">
          {statements.length > 0 ? (
            <form onSubmit={handleSubmit}>
              <Table className="mb-3" striped>
                {statements.map((statement, key) => (
                  <Table.Body className="divide-y" key={key}>
                    <Table.Row>
                      <Table.Cell>
                        <h6>{statement.code} {statement.desc}</h6>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex space-x-4">
                          <div className="flex items-center gap-2">
                            <Radio
                              id={`yes-${statement.code}`}
                              name={statement.code}
                              value={true}
                            />
                            <Label htmlFor={`yes-${statement.code}`}>Ya</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Radio
                              id={`no-${statement.code}`}
                              name={statement.code}
                              value={false}
                            />
                            <Label htmlFor={`no-${statement.code}`}>Tidak</Label>
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
              <div className="grid place-content-center">
                <Button color="dark" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          ) :
            careers.length > 0 ?
              <div>
                {careers.map((career, key) => (
                  <div key={key}>{career.name}</div>
                ))}
              </div>
              :
              <div>
                tidak punya karir
              </div>
          }
        </div>
      </section>
    </>
  )
}
