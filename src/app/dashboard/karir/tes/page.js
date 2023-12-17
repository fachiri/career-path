'use client'

import LoaderFull from "@/components/loaderfull"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { Alert, Button, Label, Radio, Table } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import useSWR from 'swr'

export default function DashboardTesKarir() {
  const { user } = useUser()
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const [facts, setFacts] = useState({})
  const [index, setIndex] = useState(0)
  const [statements, setStatements] = useState([])
  const [careers, setCareers] = useState([])
  const [isLoading, setIsLoading] = useState(['handleSubmitRule'])
  const [alert, setAlert] = useState(null)
  const [dataSaved, setDataSaved] = useState(false)
  const router = useRouter()

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
    } finally {
      setIsLoading((prevLoading) => prevLoading.filter(item => item !== `handleSubmitRule`));
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setIsLoading((prevLoading) => [...prevLoading, `handleSubmitRule`]);

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

      e.target.reset();
    } catch (error) {

    } finally {
      setIsLoading((prevLoading) => prevLoading.filter(item => item !== `handleSubmitRule`));
    }
  }

  const handleSave = async () => {
    try {
      setIsLoading((prevLoading) => [...prevLoading, `handleSave`]);

      const userId = userData.data.id
      const careerIds = careers.map(career => career.id)

      const { data: saveData } = await axios.post('/api/histories', { userId, careerIds })

      setDataSaved(true)
      setAlert({ color: 'success', message: saveData.message })
    } catch (error) {
      setAlert({ color: 'failure', message: error.message })
    } finally {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsLoading((prevLoading) => prevLoading.filter(item => item !== `handleSave`));
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
        <div className="grid grid-cols-1 gap-5">
          <div className="w-full p-6 bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow dark:bg-gray-800 dark:border-gray-700">
            {isLoading.includes(`handleSubmitRule`) ?
              <div role="status" className="max-w-sm animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                <span className="sr-only">Loading...</span>
              </div>
              : (statements.length > 0 ? (
                <form onSubmit={handleSubmit}>
                  <Table className="mb-3" striped>
                    <Table.Body className="divide-y">
                      {statements.map((statement, key) => (
                        <Table.Row key={key}>
                          <Table.Cell>
                            <h6>
                              {/* {statement.code}  */}
                              {statement.desc}
                            </h6>
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
                      ))}
                      <Table.Row>
                        <Table.Cell>
                        </Table.Cell>
                        <Table.Cell>
                          <Button color="dark" type="submit">
                            Submit
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </form>
              ) :
                careers.length > 0 ?
                  <div>
                    <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hasil Tes Karir</h5>
                    <p>
                      <span className="font-bold mb-2">{user?.firstName}</span>, kamu hebat!
                    </p>
                    <p className="mb-3">
                      Kamu adalah orang yang{' '}
                      {Array.from(new Set(careers.map(career => career.personality)))
                        .map((personality, index, array) => (
                          <span key={index} className="font-bold">
                            {personality}
                            {index < array.length - 2 ? ', ' : index === array.length - 2 ? ' dan ' : ''}
                          </span>
                        ))}
                      .
                    </p>
                    {Array.from(
                      new Set(
                        careers.map(career => `${career.personality}, Kamu ${career.personalityDesc}`)
                      )
                    ).map((item, index, array) => (
                      <p key={index} className="mb-3">
                        Sebagai seseorang dengan kepribadian {item}
                      </p>
                    ))}
                    <p className="mb-3">
                      Berdasarkan kepribadian yang kamu miliki, kami merekomendasikan untuk mendalami bidang keahlian {' '}
                      {Array.from(new Set(careers.map(career => career.expertise)))
                        .map((expertise, index, array) => (
                          <span key={index}>
                            <b>{expertise}</b>
                            {index < array.length - 2 ? ', ' : index === array.length - 2 ? ' dan ' : ''}
                          </span>
                        ))}
                      . Berikut ini beberapa pekerjaan atau karir berdasarkan bidang tersebut:
                    </p>
                    <ul className="max-w-md space-y-1 list-disc list-inside mb-4">
                      {careers.map((career, key) => (
                        <li key={key}>{career.name}</li>
                      ))}
                    </ul>
                    <div className="flex justify-between">
                      <Button color="light" onClick={() => router.push('/dashboard/karir')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        Kembali
                      </Button>
                      <Button
                        color="dark"
                        onClick={handleSave}
                        disabled={isLoading.includes(`handleSave`) || dataSaved ? true : false}
                      >
                        Simpan Hasil
                        {dataSaved &&
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-3 w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        }
                      </Button>
                    </div>
                  </div>
                  :
                  <div>
                    <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hasil Tes Karir</h5>
                    <p className="mb-3">
                      <span className="font-bold mb-2">{user?.firstName}</span>, hasil tes karir kamu telah dianalisis. Meskipun dalam tes ini tidak ditemukan rekomendasi karir yang spesifik untukmu, perlu diingat bahwa setiap individu memiliki keunikan dan potensi yang berbeda.
                    </p>
                    <p className="mb-3">
                      Kamu mungkin memiliki kombinasi kepribadian yang tidak hanya terbatas pada beberapa tipe kepribadian seperti <span className="font-medium">Realistic</span>, <span className="font-medium">Investigative</span>, <span className="font-medium">Artistic</span>, <span className="font-medium">Social</span>, dan <span className="font-medium">Conventional</span>, namun masih tetap unik. Meskipun tidak ada rekomendasi karir khusus pada saat ini, ini bisa menjadi kesempatan untuk mengeksplorasi berbagai bidang dan menentukan arah yang sesuai dengan minat, passion, dan keahlianmu.
                    </p>
                    <p className="mb-3">
                      Jangan ragu untuk mencari lebih banyak informasi, berbicara dengan orang-orang di industri yang berbeda, dan terus mengembangkan diri. Karir yang paling cocok mungkin saja belum teridentifikasi, dan eksplorasi lebih lanjut dapat membawamu pada peluang yang tak terduga.
                    </p>
                    <p className="mb-5">
                      Teruslah menjelajahi potensimu, dan ingatlah bahwa tes ini hanya merupakan salah satu langkah dalam perjalananmu menuju karir yang memuaskan dan bermakna ♡.
                    </p>
                    <Button color="light" onClick={() => router.push('/dashboard/karir')}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                      Kembali
                    </Button>
                  </div>
              )
            }

          </div>
        </div>
      </section>
    </>
  )
}
