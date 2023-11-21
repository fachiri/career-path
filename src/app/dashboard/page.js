'use client'

import { useUser } from "@clerk/nextjs";
import { useEffect } from 'react';


export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  // useEffect(() => {
    // console.log(user)
  // }, [])

  return (
    <>
      <section className="px-4 lg:px-6 xl:px-8">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem laudantium quod, ipsum corrupti minima debitis? Distinctio, provident, reprehenderit labore quia nostrum sequi excepturi iste nisi quisquam praesentium maiores impedit repellat dolorem neque? Voluptas, esse. Tempore quasi perspiciatis amet, esse provident distinctio exercitationem at corrupti porro asperiores iste sint, dolores nihil tenetur excepturi! Amet consequuntur deserunt sunt dolorem cumque optio libero eveniet excepturi. Fugit deserunt soluta nihil aliquid est voluptas itaque eum dicta totam! Dicta aperiam iure adipisci quod ipsa, nulla natus soluta sint mollitia porro maxime, quos incidunt voluptates cupiditate laboriosam nam doloremque totam aspernatur non cum? Asperiores, iste porro.</p>
      </section>
    </>
  )
}
