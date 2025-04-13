import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="flex flex-col gap-8 p-8 max-w-lg w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <p className="text-center text-gray-700 dark:text-gray-300">
          This sample web app aims to show how one handles linking multiple accounts to a single user using NextAuth.js.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/api/auth/signin"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center shadow-sm"
          >
            <FaSignInAlt className='w-4 h-4'/> Login / Sign Up
          </Link>
          <Link
            href="https://github.com/PerseverantDT/NextAuth-Account-Linking-Sample"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors text-center shadow-sm"
          >
            <SiGithub className='w-4 h-4'/> View Repository
          </Link>
        </div>
      </main>
    </div>
  );
}
