import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Typewriter } from 'react-simple-typewriter'

export default function Home() {


  return (
    <>
      <Head>
        <title>Task Mate | Zbytes</title>
        <meta name="description" content="Task Mate: A simple solution for complex tasks." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>















      <div className="relative h-screen overflow-hidden bg-indigo-900">
            <img alt='s' src="bg12.jpg" className="absolute object-cover w-full h-full" />
            <div className="absolute inset-0 bg-black opacity-25">
            </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-30 backdrop-filter backdrop-blur-md"></div>

            <header className="absolute top-0 left-0 right-0 z-20">
                <nav className="container px-6 py-4 mx-auto md:px-12">
                    <div className="items-center justify-center md:flex">
                        <div className="flex items-center justify-between">
                        </div>
                        <div className="items-center text-center md:flex ">
                            <Link href="/" className="mx-3 text-lg text-white uppercase cursor-pointer hover:text-gray-300">
                                Home
                            </Link>
                            <Link href="/about" className="mx-3 text-lg text-white uppercase cursor-pointer hover:text-gray-300">
                                About
                            </Link>
                            <Link href="/dashboard" className="mx-3 text-lg text-white uppercase cursor-pointer hover:text-gray-300">
                            Dashboard
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
                <div className="relative z-10 flex flex-col items-center w-full">
                <div className='flex flex-col justify-center items-center'>
            <Image
              src="/logo.png"
              alt="Logo"
              className="mx-auto mb-2 animate-bounce"
              height={400}
              width={400}
            />
            <h1 className="font-extrabold text-white leading-tight text-left text-5xl md:text-6xl">
              <span className="text-orange-500">TASK</span>MATE
            </h1>
            <h1 className="font-bold text-white leading-tight text-center mt-5 text-3xl md:text-4xl">
              A <span className="text-orange-500">simple</span> solution for<span className="text-orange-500"> complex</span> tasks.
            </h1>
            <span className="font-extrabold text-white leading-tight text-center text-3xl md:text-4xl">
             
            </span>
            <Link href={'/login'}
              className="bg-orange-600 hover:bg-orange-700  mt-4 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="button"
            >
              <Typewriter
                words={['Get Started','Register', 'Login', 'Manage Tasks']}
                loop={5}
                cursor
                cursorStyle='|'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1400}
              />
            </Link>
          </div>
                </div>
            </div>
        </div>











{/* 

      <div className="relative h-screen">
        <img
          src="/bg.jpg"
          className='h-[100vh] w-full'
          alt=""
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur"></div>
        <div className="absolute inset-0 flex-col flex justify-center items-center text-white font-bold">
        kjhj
     
        </div>
      </div> */}



    </>
  )
}





