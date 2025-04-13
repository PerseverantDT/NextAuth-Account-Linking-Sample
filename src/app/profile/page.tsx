import { auth } from "@/lib/auth";
import Link from "next/link";

import { connectMongoClient } from "@/lib/db";
import { ObjectId } from "mongodb";
import { Account } from "next-auth"; // Assuming Account type is relevant for display

export default async function Profile()
{
    const session = await auth();
    if (session === null) {
        return <div>Not authenticated.</div>
    }

    let fetchedAccounts: Partial<Account>[] = [];
    try {
        const database = connectMongoClient().db();
        const accountsFromDb = await database.collection('accounts').find<Account>({ userId: new ObjectId(session.user.id) }).toArray();

        fetchedAccounts = accountsFromDb.map((account) => {
            return {
                provider: account.provider,
                providerAccountId: `${account.providerAccountId.slice(0, 5)}${account.providerAccountId.slice(5).replaceAll(/.*/g, '*')}`,
            };
        });
    } catch (error) {
        console.error("Error fetching accounts directly in profile page:", error);
        fetchedAccounts = [{ provider: "Error fetching accounts" }];
    }

    return (
        <div>
            <pre>
                {JSON.stringify({ session, accounts: fetchedAccounts }, null, 2)}
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
                <Link
                    href="https://github.com/PerseverantDT/NextAuth-Account-Linking-Sample"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
                >
                    View Repository
                </Link>
            </div>
        </div>
    )
}