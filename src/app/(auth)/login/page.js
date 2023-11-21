// 'use client'

// import Link from "next/link";
// import axios from 'axios';

// export default function Login() {
//   const handleSubmit = async (e) => {
//     try {
//       e.preventDefault()
  
//       const formData = {
//         email: e.target[0].value,
//         password: e.target[1].value,
//       }
  
//       const response = await axios.post('api/auth/login', formData)
  
//       localStorage.setItem('token', response.data.data.token)
//     } catch (error) {
      
//     }
//   }

//   return (
//     <>
//       <div className="mb-5">
//         <h1 className="font-bold text-3xl text-gray-900">Masuk</h1>
//         <p className="text-gray-700">Temukan Karir anda dan Mulai Konseling</p>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="flex -mx-3">
//           <div className="w-full px-3 mb-3">
//             <label htmlFor="email" className="text-xs font-semibold text-gray-700 px-1">Email</label>
//             <div className="flex">
//               <div
//                 className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-300 text-sm">
//                   <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
//                 </svg>
//               </div>
//               <input
//                 type="email"
//                 className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-black focus:ring-0"
//                 placeholder="fachry@example.com"
//                 name="email"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex -mx-3">
//           <div className="w-full px-3 mb-8">
//             <label htmlFor="password" className="text-xs font-semibold text-gray-700 px-1">Password</label>
//             <div className="flex">
//               <div
//                 className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-300 text-sm">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
//                 </svg>
//               </div>
//               <input
//                 type="password"
//                 className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black text-black focus:ring-0"
//                 placeholder="********"
//                 name="password"
//                 autoComplete="password"
//               />
//             </div>
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-black active:bg-gray-600 text-white rounded-lg px-3 py-3 font-semibold"
//         >
//           MASUK
//         </button>
//         <hr className="my-6 border-gray-300 w-full" />
//         {/* <button
//           type="button"
//           className="w-full block bg-white hover:bg-gray-100 active:opacity-75 text-gray-900 font-semibold rounded-lg px-4 py-3 border-2 border-gray-300"
//         >
//           <div className="flex items-center justify-center">
//             <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
//             <span className="ml-4"> Masuk dengan Google</span>
//           </div>
//         </button> */}
//         <p className="mt-8 flex justify-between items-center">
//           <span className="text-gray-700">
//             Belum punya akun?
//             <Link href="/register">
//               <span className="ml-1 text-black hover:text-gray-600 font-semibold">Daftar</span>
//             </Link>
//           </span>
//           <Link href="/forgot">
//             <span className="text-black hover:text-gray-600 font-semibold">Lupa Password</span>
//           </Link>
//         </p>
//       </form>
//     </>
//   )
// }
