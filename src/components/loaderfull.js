'use client'

import logo from '@/assets/logo.svg'
import Image from "next/image";

export default function LoaderFull() {
  return (
    <div className="absolute left-0 top-0 z-50 w-screen h-screen bg-white grid place-content-center">
      <Image
        src={logo}
        alt="Logo CareerPath"
        width={150}
        height={50}
        className='animate-pulse'
      />
    </div>
  )
}