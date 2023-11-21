// 'use client'

// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import useSWR from 'swr'
// import { Formik } from 'formik';
// import axios from 'axios';
// import { Alert } from "flowbite-react";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     school: {
//       name: 'Pilih Sekolah',
//       npsnId: 0
//     },
//     password: '',
//     repeatPassword: ''
//   })
//   const [schoolKeyword, setSchoolKeyword] = useState('')
//   const [perPage, setPerPage] = useState(5)
//   const [showSchools, setShowSchools] = useState(false)
//   const [alertMessage, setAlertMessage] = useState(null)

//   const apiUrl = process.env.NEXT_PUBLIC_URL_API_SEKOLAH
//   const fetcher = (...args) => fetch(...args).then(res => res.json())
//   const { data, error, isLoading } = useSWR(`${apiUrl}/sekolah/s?sekolah=${schoolKeyword}&perPage=${perPage}`, fetcher)

//   useEffect(() => {
//     if (data?.total_data < 5) {
//       setPerPage(data?.total_data)
//     } else {
//       setPerPage(5)
//     }
//   }, [schoolKeyword])

//   const loadMoreSchool = () => {
//     setPerPage(perPage + 5)
//   }

//   const setSelectedSchool = (school, npsnId) => {
//     setFormData(prevState => ({
//       ...prevState,
//       school: { name: school, npsnId }
//     }));
//     setShowSchools(false)
//   }

//   return (
//     <>
//       <div className="mb-5">
//         <h1 className="font-bold text-3xl text-gray-900">DAFTAR</h1>
//         <p className="text-gray-700">Masukkan informasi Anda untuk mendaftar.</p>
//       </div>
//       {alertMessage && (
//         <div className="mb-3">
//           <Alert color="success" onDismiss={() => setAlertMessage(null)}>
//             {alertMessage}
//           </Alert>
//         </div>
//       )}
//       <Formik
//         initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', npsn: '' }}
//         validate={async values => {
//           const errors = {};

//           if (!values.firstName) {
//             errors.firstName = 'Nama depan wajib diisi';
//           }

//           if (!values.lastName) {
//             errors.lastName = 'Nama belakang wajib diisi';
//           }

//           if (!values.email) {
//             errors.email = 'Email wajib diisi';
//           } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//             errors.email = 'Format email tidak valid';
//           }

//           if (!values.password) {
//             errors.password = 'Password wajib diisi';
//           } else if (values.password.length < 8) {
//             errors.password = 'Password minimal 8 karakter';
//           }

//           if (!values.confirmPassword) {
//             errors.confirmPassword = 'Konfirmasi password wajib diisi';
//           } else if (values.confirmPassword !== values.password) {
//             errors.confirmPassword = 'Password tidak cocok';
//           }

//           if (!values.npsn) {
//             errors.npsn = 'Sekolah wajib diisi';
//           }

//           return errors;
//         }}
//         onSubmit={async (values, { setSubmitting, setErrors }) => {
//           try {
//             const response = await axios.post('/api/register', {
//               firstName: values.firstName,
//               lastName: values.lastName,
//               email: values.email,
//               role: 'SISWA',
//               password: values.password,
//               npsn: values.npsn
//             })

//             setAlertMessage(response.data.message)
//           } catch (error) {
//             if (error.response && error.response.status === 422) {
//               const serverErrors = error.response.data;
//               if (serverErrors && serverErrors.message === 'Email sudah dipakai') {
//                 setErrors({ ...serverErrors, email: 'Email sudah dipakai' });
//               }
//             }
//           } finally {
//             setSubmitting(false)
//           }
//         }}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           isSubmitting,
//         }) => (
//           <form onSubmit={handleSubmit}>
//             <div className="flex -mx-3">
//               <div className="w-full px-3 mb-3">
//                 <label htmlFor="School" className="text-xs font-semibold text-gray-700 px-1">
//                   Sekolah
//                 </label>
//                 <div className="relative">
//                   <div
//                     className="flex justify-between items-center px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-gray-400 cursor-pointer"
//                     onClick={() => setShowSchools(!showSchools)}
//                   >
//                     <p className="pointer-events-none select-none">{!showSchools ? formData.school.name : null}</p>
//                     <p className="pointer-events-none select-none">{showSchools ? 'Tutup' : null}</p>
//                     {!showSchools ? (
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
//                       </svg>
//                     ) : (
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                       </svg>
//                     )}
//                   </div>
//                   <ul
//                     className={`absolute bg-white w-full z-20 border-2 rounded-lg shadow-lg overflow-x-scroll max-h-60 ${showSchools ? '' : 'hidden'
//                       }`}
//                   >
//                     <li>
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-300 absolute my-3 ml-4">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
//                       </svg>
//                       <input
//                         value={schoolKeyword}
//                         onChange={(e) => setSchoolKeyword(e.target.value)}
//                         type="text"
//                         className="w-full pl-11 pr-4 py-2 outline-0 border-0 focus:border-0 focus:outline-0 focus:ring-0 text-gray-400"
//                         placeholder="Cari..."
//                       />
//                     </li>
//                     <li className="px-4 py-1">
//                       <span className="text-xs text-gray-400">{perPage} dari {data?.total_data} data</span>
//                     </li>
//                     {isLoading ? <li className="py-2 px-4 text-center">Loading...</li> : null}
//                     {
//                       data?.dataSekolah.length === 0 && !isLoading ? (
//                         <li className="py-2 px-4">Data tidak ditemukan</li>
//                       ) : (
//                         data?.dataSekolah.map((school) => (
//                           <li
//                             key={school.id}
//                             onClick={() => setSelectedSchool(school.sekolah, school.npsn)}
//                             className='flex'
//                           >
//                             <label htmlFor={school.npsn} className="w-full py-2 px-4 hover:bg-gray-200 cursor-pointer">
//                               {school.sekolah}
//                               <input
//                                 type="radio"
//                                 name="npsn"
//                                 id={school.npsn}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={school.npsn}
//                                 className='hidden'
//                               />
//                             </label>
//                           </li>
//                         ))
//                       )
//                     }
//                     {perPage < data?.total_data ? (
//                       <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-xs text-gray-400 border-t-2 flex justify-center" onClick={loadMoreSchool}>
//                         <span className="mr-2 font-medium">Muat lagi</span>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
//                         </svg>
//                       </li>
//                     ) : null}
//                   </ul>
//                 </div>
//                 <small className='text-red-500'>{errors.npsn && touched.npsn && errors.npsn}</small>
//               </div>
//             </div>
//             <div className="flex -mx-3">
//               <div className="w-1/2 px-3 mb-3">
//                 <label htmlFor="" className="text-xs font-semibold text-gray-700 px-1">
//                   Nama Depan
//                 </label>
//                 <div className="flex">
//                   <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-300 text-sm">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="text"
//                     name="firstName"
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.firstName}
//                     className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-black focus:ring-0"
//                     placeholder="Muh"
//                   />
//                 </div>
//                 <small className='text-red-500'>{errors.firstName && touched.firstName && errors.firstName}</small>
//               </div>
//               <div className="w-1/2 px-3 mb-3">
//                 <label htmlFor="" className="text-xs font-semibold text-gray-700 px-1">
//                   Nama Belakang
//                 </label>
//                 <div className="flex">
//                   <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-300 text-sm">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="text"
//                     name="lastName"
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.lastName}
//                     className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-black focus:ring-0"
//                     placeholder="Fachry"
//                   />
//                 </div>
//                 <small className='text-red-500'>{errors.lastName && touched.lastName && errors.lastName}</small>
//               </div>
//             </div>
//             <div className="flex -mx-3">
//               <div className="w-full px-3 mb-3">
//                 <label htmlFor="" className="text-xs font-semibold text-gray-700 px-1">
//                   Email
//                 </label>
//                 <div className="flex">
//                   <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-300 text-sm">
//                       <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
//                     </svg>
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.email}
//                     className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-black focus:ring-0"
//                     placeholder="fachry@example.com"
//                   />
//                 </div>
//                 <small className='text-red-500'>{errors.email && touched.email && errors.email}</small>
//               </div>
//             </div>
//             <div className="flex -mx-3">
//               <div className="w-full px-3 mb-3">
//                 <label htmlFor="" className="text-xs font-semibold text-gray-700 px-1">
//                   Password
//                 </label>
//                 <div className="flex">
//                   <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-300 text-sm">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="password"
//                     name="password"
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.password}
//                     className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-black focus:ring-0"
//                     placeholder="************"
//                     autoComplete="new-password"
//                   />
//                 </div>
//                 <small className='text-red-500'>{errors.password && touched.password && errors.password}</small>
//               </div>
//             </div>
//             <div className="flex -mx-3">
//               <div className="w-full px-3 mb-8">
//                 <label htmlFor="" className="text-xs font-semibold text-gray-700 px-1">
//                   Ulangi Password
//                 </label>
//                 <div className="flex">
//                   <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-300 text-sm">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.confirmPassword}
//                     className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-black focus:ring-0"
//                     placeholder="************"
//                     autoComplete="new-password"
//                   />
//                 </div>
//                 <small className='text-red-500'>{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</small>
//               </div>
//             </div>
//             <button
//               type='submit'
//               disabled={isSubmitting}
//               className="w-full bg-black active:bg-gray-600 text-white rounded-lg px-3 py-3 font-semibold"
//             >
//               DAFTAR SEKARANG
//             </button>
//             <hr className="my-6 border-gray-300 w-full" />
//             <p className="mt-8 flex justify-between items-center">
//               <span className="text-gray-700">
//                 Sudah punya akun?
//                 <Link href="/login">
//                   <span className="ml-1 text-black hover:text-gray-600 font-semibold">Masuk</span>
//                 </Link>
//               </span>
//             </p>
//           </form>
//         )}
//       </Formik>
//     </>
//   )
// }
