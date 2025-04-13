import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        This sample web app aims to show how one handles linking multiple accounts to a single user using
        NextAuth.js.

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/api/auth/signin"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </Link>
          <Link
            href="https://github.com/PerseverantDT/NextAuth-Account-Linking-Sample"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
          >
            View Repository
          </Link>
        </div>
      </main>
    </div>
  );
}
