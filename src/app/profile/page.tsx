import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Profile()
{
    const session = await auth();
    if (session === null) {
        return <div>Not authenticated.</div>
    }

    // Fetch the accounts linked to the user
    const accountsResponse = await fetch(`${process.env.NEXT_PUBLIC_URL || ''}/api/accounts/${session.user.id}`);
    const accounts = await accountsResponse.json();

    return (
        <div>
            <pre>
                {JSON.stringify({session, accounts}, null, 2)}
            </pre>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link
                    href="/api/auth/signin"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-center"
                >
                    Link Another Account
                </Link>
                <Link
                    href="/api/auth/signout"
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-center"
                >
                    Sign Out
                </Link>
            </div>
        </div>
    )
}