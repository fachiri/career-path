export default function Home() {
  return (
    <>
      <section className="px-4 lg:px-6 xl:px-8 sm:mt-6 lg:mt-8 max-w-7xl mx-auto">
        <div
          className="my-10 max-w-7xl flex gap-3 md:gap-5 lg:gap-10 lg:flex-justify lg:flex flex-col lg:flex-row"
        >
          <div className="sm:text-center lg:text-left">
            <h1 className="text-3xl tracking-tight font-extrabold text-black sm:text-5xl md:text-6xl">
              <span className="block lg:mb-3">Capai Kesuksesan</span>
              <span className="block text-[#fcae04] xl:inline">Temukan Karirmu!</span>
            </h1>
            <p
              className="mt-3 text-base text-gray-800 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
            >
              Kami menyediakan wadah bagi siswa dan guru BK dalam pelayanan konseling. Dapatkan
              rekomendasi karir dengan cepat dan gapai impianmu bersama kami.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <button
                  className="w-full flex items-center justify-center px-8 py-2 border-2 md:border-4 border-transparent text-base font-medium rounded-md bg-black active:bg-gray-600 text-white md:py-4 md:text-lg md:px-8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FFFFFF"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                    />
                  </svg>
                  <span className="ms-3"> Temukan Karir </span>
                </button>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button
                  className="w-full flex items-center justify-center px-8 py-2 border-2 md:border-4 border-gray-600 text-base font-medium rounded-md bg-white active:bg-gray-200 text-gray-800 md:py-4 md:text-lg md:px-8"
                >
                  Mulai Bimbingan
                </button>
              </div>
            </div>
          </div>
          <div className="lg:inset-y-0 lg:right-0 lg:w-1/2 my-4">
            <img
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full rounded"
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  )
}
