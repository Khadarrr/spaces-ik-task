import Link from 'next/link';

export default function SideNav() {
  return (
    <div className="flex glass flex-col h-full px-3 py-4 md:px-2">
      {/* Logo and Home Link */}
      <Link href="/">
        <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-black p-4 md:h-40">
          <div className="w-32 text-white md:w-40">
            {/* <AcmeLogo /> Replace with your logo component or text */}
          </div>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="flex-grow flex flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {/* Topics or Navigation Links */}
        <Link href="/">
          <div className="flex h-12 items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:p-2 md:px-3">
            Home
          </div>
        </Link>

        <Link href="/events">
          <div className="flex h-12 items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:p-2 md:px-3">
            Events
          </div>
        </Link>

        <Link href="/spaces">
          <div className="flex h-12 items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:p-2 md:px-3">
            Spaces
          </div>
        </Link>

        <Link href="/community">
          <div className="flex h-12 items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:p-2 md:px-3">
            Community
          </div>
        </Link>

        {/* Additional Topics or Links can be added as needed */}
      </div>
    </div>
  );
}
