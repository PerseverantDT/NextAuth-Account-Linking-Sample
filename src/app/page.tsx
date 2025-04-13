import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="flex flex-col gap-8 p-8 max-w-lg w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <div className="flex justify-center">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </div>
        <p className="text-center text-gray-700 dark:text-gray-300">
          This sample web app aims to show how one handles linking multiple accounts to a single user using NextAuth.js.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/api/auth/signin"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center shadow-sm"
          >
            Login / Sign Up
          </Link>
          <Link
            href="https://github.com/PerseverantDT/NextAuth-Account-Linking-Sample"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors text-center shadow-sm"
          >
            View Repository
          </Link>
        </div>
      </main>
    </div>
  );
}
