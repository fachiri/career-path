'use client'

import logo from '@/assets/logo.svg'
import Image from 'next/image';
import Link from 'next/link'
import { useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <header>
      <section className="flex justify-between bg-white shadow-lg h-24 mb-8">
        <Link
          href="/"
          className="lg:border-r flex-shrink-0 flex items-center justify-center px-4 lg:px-6 xl:px-8"
        >
          <Image
            src={logo}
            alt="Logo CareerPath"
            width={150}
            height={50}
          />
        </Link>
        <nav className="header-links contents font-semibold text-base lg:text-lg">
          <ul className="hidden lg:flex items-center ml-4 xl:ml-8 mr-auto">
            <li>
              <Link href="/" className="p-3 xl:p-6">
                <button>
                  <span>Beranda</span>
                </button>
              </Link>
            </li>
            <li>
              <Link href="/karir" className="p-3 xl:p-6">
                <button>
                  <span>Karir</span>
                </button>
              </Link>
            </li>
            <li>
              <Link href="/konseling" className="p-3 xl:p-6">
                <button>
                  <span>Konseling</span>
                </button>
              </Link>
            </li>
            <li>
              <Link href="/blog" className="p-3 xl:p-6">
                <button>
                  <span>Blog</span>
                </button>
              </Link>
            </li>
            <li>
              <Link href="/tentang" className="p-3 xl:p-6">
                <button>
                  <span>Tentang</span>
                </button>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="lg:border-l flex items-center px-4 lg:px-6 xl:px-8 lg:space-x-3">
          <button className="lg:hidden bg-white active:bg-gray-200 text-black font-bold p-2 rounded border">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
              <path
                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
              />
            </svg>
          </button>
          {isSignedIn ?
            (
              <>
                <Link href="/dashboard">
                  <button
                    className="hidden lg:flex bg-black active:bg-gray-600 text-white font-bold px-4 xl:px-6 py-2 xl:py-3 rounded"
                  >
                    Dashboard
                  </button>
                </Link>
              </>
            ) :
            (
              <>
                <Link href="/sign-up">
                  <button
                    className="hidden lg:flex bg-white active:bg-gray-200 text-black font-bold px-4 xl:px-6 py-2 xl:py-3 rounded border"
                  >
                    Daftar
                  </button>
                </Link>
                <Link href="/sign-in">
                  <button
                    className="hidden lg:flex bg-black active:bg-gray-600 text-white font-bold px-4 xl:px-6 py-2 xl:py-3 rounded"
                  >
                    Masuk
                  </button>
                </Link>
              </>
            )
          }
        </div>
      </section>
    </header>
  )
}
