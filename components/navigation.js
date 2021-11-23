import Link from 'next/link'

export default function Navigation() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-green-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white ml-10 mr-6">
          <span className="font-semibold text-xl tracking-tight">BeerLovers Inc.</span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link href="/">
                <a className="block lg:inline-block px-3 py-2 rounded text-white hover:bg-green-600 hover:text-white mr-4">
                Blog
                </a>
            </Link>
            <Link href="/about">
                <a className="block lg:inline-block px-3 py-2 rounded text-white hover:bg-green-600 hover:text-white mr-4">
                About us
                </a>
            </Link>
            <Link href="/contact">
                <a className="block lg:inline-block px-3 py-2 rounded text-white hover:bg-green-600 hover:text-white mr-4">
                Contact us
                </a>
            </Link>
            <Link href="/general-info">
                <a className="block lg:inline-block px-3 py-2 rounded text-white hover:bg-green-600 hover:text-white mr-4">
                General info
                </a>
            </Link>
          </div>
        </div>
      </nav>
    )
}