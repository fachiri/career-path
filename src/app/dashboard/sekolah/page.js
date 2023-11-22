'use client'

import LoaderFull from "@/components/loaderfull"
import { useUser } from "@clerk/nextjs"
import { Alert, Badge } from "flowbite-react"
import { useEffect, useState } from "react"
import useSWR, { mutate } from 'swr';
import axios from "axios";

export default function DashboardSekolah() {
  const [schoolKeyword, setSchoolKeyword] = useState('')
  const [perPage, setPerPage] = useState(5)
  const [school, setSchool] = useState({ name: 'Pilih Sekolah', npsn: null })
  const [showSchools, setShowSchools] = useState(false)
  const [alert, setAlert] = useState(null)

  const apiUrl = process.env.NEXT_PUBLIC_URL_API_SEKOLAH
  const { user } = useUser();
  const fetcher = (...args) => fetch(...args).then(res => res.json());

  const { data: schoolData, error: schoolError, isLoading: schoolLoading } = useSWR(
    `${apiUrl}/sekolah/s?sekolah=${schoolKeyword}&perPage=${perPage}`,
    fetcher
  );

  const { data: userData, error: userError, isLoading: userLoading } = useSWR(
    `/api/users/school/${user?.id}`,
    fetcher
  );

  useEffect(() => {
    if (schoolData?.total_data < 5) {
      setPerPage(schoolData?.total_data)
    } else {
      setPerPage(5)
    }
  }, [schoolKeyword])

  useEffect(() => {
    if (userData?.data) {
      setSchool({ name: userData.data.school.name, npsn: userData.data.school.npsn });
    }
  }, [userError, userData]);

  const loadMoreSchool = () => {
    setPerPage(perPage + 5)
  }

  const setSelectedSchool = (school, npsn) => {
    setSchool({ name: school, npsn })
    setShowSchools(false)
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
  
      if (!school.name || !school.npsn) {
        return setAlert({ color: 'failure', message: 'Pilih sekolah' })
      }
  
      const response = await axios.put(`/api/users/school/${user?.id}`, school)

      mutate(`/api/users/school/${user?.id}`);
      setAlert({ color: 'success', message: response.data.message })
    } catch (error) {
      setAlert({ color: 'failure', message: error.message })
    }
  }

  return (
    <>
      <section className="sm:px-4 lg:px-6 xl:px-8">
        <div className="w-full p-6 bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow dark:bg-gray-800 dark:border-gray-700">
          {alert && (
            <div className="mb-3">
              <Alert color={alert.color} onDismiss={() => setAlert(null)}>
                <div dangerouslySetInnerHTML={{ __html: alert.message }} />
              </Alert>
            </div>
          )}
          <div className="grid place-content-end">
            <Badge color={userData?.data?.user?.schoolStatus == 'PENDING' ? 'warning' : userData?.data?.user?.schoolStatus == 'VERIFIED' ? 'success' : 'gray'}>{userData?.data?.user?.schoolStatus}</Badge>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-3">
                <label htmlFor="School" className="text-xs font-semibold text-gray-700 px-1">
                  Sekolah
                </label>
                <div className="relative">
                  <div
                    className="flex justify-between items-center px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-gray-400 cursor-pointer"
                    onClick={() => setShowSchools(!showSchools)}
                  >
                    <p className="pointer-events-none select-none">{!showSchools ? school.name : null}</p>
                    <p className="pointer-events-none select-none">{showSchools ? 'Tutup' : null}</p>
                    {!showSchools ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <ul
                    className={`absolute bg-white w-full z-20 border-2 rounded-lg shadow-lg overflow-x-scroll max-h-60 ${showSchools ? '' : 'hidden'
                      }`}
                  >
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-300 absolute my-3 ml-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                      <input
                        value={schoolKeyword}
                        onChange={(e) => setSchoolKeyword(e.target.value)}
                        type="text"
                        className="w-full pl-11 pr-4 py-2 outline-0 border-0 focus:border-0 focus:outline-0 focus:ring-0 text-gray-400"
                        placeholder="Cari..."
                      />
                    </li>
                    <li className="px-4 py-1">
                      <span className="text-xs text-gray-400">{perPage} dari {schoolData?.total_data} data</span>
                    </li>
                    {schoolLoading ? <li className="py-2 px-4 text-center">Loading...</li> : null}
                    {
                      schoolData?.dataSekolah.length === 0 && !schoolLoading ? (
                        <li className="py-2 px-4">Data tidak ditemukan</li>
                      ) : (
                        schoolData?.dataSekolah.map((school) => (
                          <li
                            key={school.id}
                            onClick={() => setSelectedSchool(school.sekolah, school.npsn)}
                            className="w-full py-2 px-4 hover:bg-gray-200 cursor-pointer"
                          >
                            {school.sekolah}
                          </li>
                        ))
                      )
                    }
                    {perPage < schoolData?.total_data ? (
                      <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-xs text-gray-400 border-t-2 flex justify-center" onClick={loadMoreSchool}>
                        <span className="mr-2 font-medium">Muat lagi</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </li>
                    ) : null}
                  </ul>
                </div>
              </div>
            </div>
            <div className="grid place-content-end">
              <button
                type='submit'
                className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Perbarui
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
