import { auth } from "@/lib/auth";
import Link from "next/link";

import { connectMongoClient } from "@/lib/db";
import { ObjectId } from "mongodb";
import { Account } from "next-auth"; // Assuming Account type is relevant for display
import { LuUser, LuMail, LuLink2 } from 'react-icons/lu'
import { SiGithub, SiGitlab, SiGmail } from "react-icons/si";
import { JSX } from "react";

export default async function Profile() {
    const session = await auth();
    if (session === null) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg text-center">
                    <p className="text-red-500 dark:text-red-400">Not authenticated.</p>
                    <Link
                        href="/api/auth/signin"
                        className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Login / Sign Up
                    </Link>
                </div>
            </div>
        );
    }

    let fetchedAccounts: {icon: JSX.Element, provider: string, providerAccountId: string}[] = [];
    let errorMessage: string | null = null;
    try {
        const database = connectMongoClient().db();
        const accountsFromDb = await database.collection('accounts').find<Account>({ userId: new ObjectId(session.user.id) }).toArray();

        fetchedAccounts = accountsFromDb.map((account) => {
            let icon: JSX.Element;
            switch (account.provider) {
                case 'google':
                    icon = (<SiGmail/>);
                    break;
                case 'github':
                    icon = (<SiGithub/>);
                    break;
                case 'gitlab':
                    icon = (<SiGitlab/>);
                    break;
                default:
                    icon = <></>;
                    break;
            }
            return {
                icon: icon,
                provider: account.provider,
                // Mask sensitive part of the ID
                providerAccountId: account.providerAccountId ? `${account.providerAccountId.slice(0, 3)}...` : 'N/A',
            };
        });
    } catch (error) {
        console.error("Error fetching accounts directly in profile page:", error);
        errorMessage = "Could not load linked accounts.";
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <div className="p-8 max-w-2xl w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200 border-b pb-4 dark:border-gray-700">User Profile</h1>

                {/* User Info Section */}
                <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                    <h2 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Session Information</h2>
                    <div className="flex items-center gap-2 mb-1">
                        <LuUser className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <strong>ID:</strong> <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{session.user.id}</span>
                    </div>
                    {session.user.name && (
                        <div className="flex items-center gap-2 mb-1">
                            <LuUser className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            <strong>Name:</strong> {session.user.name}
                        </div>
                    )}
                    {session.user.email && (
                        <div className="flex items-center gap-2">
                            <LuMail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            <strong>Email:</strong> {session.user.email}
                        </div>
                    )}
                </div>

                {/* Linked Accounts Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Linked Accounts</h2>
                    {errorMessage ? (
                        <p className="text-red-500 dark:text-red-400">{errorMessage}</p>
                    ) : fetchedAccounts.length > 0 ? (
                        <ul className="space-y-2">
                            {fetchedAccounts.map((account, index) => (
                                <li key={index} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                                    <div className="flex items-center justify-center w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full mr-3">
                                        {account.icon}
                                    </div>
                                    <span className="capitalize font-medium text-gray-800 dark:text-gray-200">{account.provider}</span>
                                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{account.providerAccountId}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400">No accounts linked yet.</p>
                    )}
                </div>

                {/* Action Buttons Section */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6 border-t pt-6 dark:border-gray-700">
                    <Link
                        href="/api/auth/signin"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center shadow-sm"
                    >
                        <LuLink2 className="w-4 h-4" /> Link Another Account
                    </Link>
                    <Link
                        href="https://github.com/PerseverantDT/NextAuth-Account-Linking-Sample"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors text-center shadow-sm"
                    >
                        <SiGithub className="w-4 h-4" /> View Repository
                    </Link>
                    <Link
                        href="/api/auth/signout"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-center shadow-sm sm:ml-auto" // Pushes sign out to the right on larger screens
                    >
                        <LuLink2 className="w-4 h-4" /> Sign Out
                    </Link>
                </div>
            </div>
        </div>
    )
}