'use client'

import logo from '@/assets/logo.svg'
import Image from "next/image";

export default function LoaderFull() {
  return (
    <div className="sticky left-0 top-0 z-50 w-full h-screen bg-white grid place-content-center overflow-hidden">
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