import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Typewriter } from 'react-simple-typewriter'
import Navbar from './components/Navbar'

const About = () => {
    return (
        <>
            <Head>
                <title>Task Mate | About</title>
            </Head>


            <div className="relative h-screen overflow-x-hidden bg-gray-900">
                <img alt='s' src="bg12.jpg" className="absolute object-cover w-full h-full" />
                <div className="absolute inset-0 bg-black opacity-25">
                </div>
                <div className="absolute inset-0 bg-gray-900 bg-opacity-30 backdrop-filter backdrop-blur-md"></div>

                <Navbar />
                <div className="container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
                    <div className="relative z-10 flex flex-col items-center w-full">
                        <div className='flex flex-col justify-center items-center'>
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                className="mx-auto mb-2 animate-bounce"
                                height={200}
                                width={200}
                            />
                            <h1 className="font-extrabold text-white leading-tight text-left text-5xl md:text-6xl">
                                <span className="text-orange-500">Abo</span>ut
                            </h1>
                            <div className='max-w-3xl'>

                            <p className="font-medium text-white leading-tight text-center mt-8 text-2xl md:text-xl">
                                Welcome to Task Mate, a web app designed to provide a simple solution for complex problems. I'm thrilled to introduce myself as the creator of this app. My name is Ujjwal(ZBytes), and I'm a full-stack developer with a passion for creating intuitive and practical solutions for users.
                            </p>
                            <p className="font-medium text-white leading-tight text-center mt-8 text-2xl md:text-xl">
                                Task Mate was developed as a project to demonstrate my proficiency in Next.js, MongoDB, and Tailwind CSS. As a developer who loves to learn, I take pride in incorporating the latest technologies and best practices into my projects.
                            </p>
                            <p className="font-medium text-white leading-tight text-center mt-8 text-2xl md:text-xl">
                                Collaboration is an integral part of my philosophy, and I had the pleasure of working with my coding partner, Abhijeet, on this project. Our teamwork allowed us to create a comprehensive and functional app that we're proud to share with you.
                            </p>
                            <p className="font-medium text-white leading-tight text-center mt-8 text-2xl md:text-xl">
                                Task Mate offers a straightforward and effective way to manage your tasks and boost your productivity. With its intuitive user interface and powerful features, Task Mate makes it easy to prioritize your to-do list and track your progress.
                            </p>
                            <p className="font-medium text-white leading-tight text-center mt-8 text-2xl md:text-xl">
                                I'm excited to share Task Mate with you and invite you to join me on this journey. Feel free to connect with me on LinkedIn or email me directly to share your feedback or learn more about the app. Thank you for your interest in Task Mate, and I look forward to hearing from you.
                            </p>
                            </div>
                            <span className="font-extrabold text-white leading-tight text-center text-3xl md:text-4xl">

                            </span>
                            <Link href={'/login'}
                                className="bg-orange-600 hover:bg-orange-700  mt-4 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                                type="button"
                                >
                                <Typewriter
                                    words={['Get Started', 'Register', 'Login', 'Manage Tasks']}
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










        </>
    )
}

export default About