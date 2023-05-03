import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
    <nav className="container px-6 py-4 mx-auto md:px-12">
        <div className="items-center justify-center md:flex">
            <div className="flex items-center justify-between">
            </div>
            <div className="items-center text-center md:flex ">
                <Link href="/" className="mx-3 text-lg text-orange-600 uppercase cursor-pointer hover:text-gray-400">
                    Home
                </Link>
                <Link href="/about" className="mx-3 text-lg text-orange-600 uppercase cursor-pointer hover:text-gray-400">
                    About
                </Link>
                <Link href="/dashboard" className="mx-3 text-lg text-orange-600 uppercase cursor-pointer hover:text-gray-400">
                Dashboard
                </Link>
            </div>
        </div>
    </nav>
</header>
  )
}

export default Navbar