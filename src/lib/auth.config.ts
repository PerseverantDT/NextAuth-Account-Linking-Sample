import type { NextAuthConfig, Session } from "next-auth"
import { JWT } from "next-auth/jwt";
import GitHub from "next-auth/providers/github";
import GitLab from "next-auth/providers/gitlab";
import Google from "next-auth/providers/google"
import { NextResponse } from "next/server";

export default {
    providers: [
        Google,
        GitHub,
        GitLab
    ],
    callbacks: {
        async jwt({ token, user }): Promise<JWT> {
            if (user) {
                token.id = user.id!;
            }
            return token;
        },
        async session({ session, token }): Promise<Session> {
            session.user.id = token.id;
            return session;
        },
        async authorized({ request, auth }): Promise<NextResponse> {
            const unprotectedUrls = [
                '/',
                '/error',
                '/_not-found/page',
                '/favicon.ico'
            ];

            if (request.nextUrl.pathname in unprotectedUrls) {
                return NextResponse.next();
            }

            const protectedUrlGroups = [
                '/profile',
                '/api/accounts'
            ];

            for (const url of protectedUrlGroups) {
                if (request.nextUrl.pathname.startsWith(url)) {
                    if (auth === null || auth.user === undefined) {
                        return NextResponse.redirect(new URL('/api/auth/signin', request.nextUrl.origin));
                    }

                    break;
                }
            }

            if (request.nextUrl.basePath === '/' && auth !== null && auth.user !== undefined) {
                return NextResponse.redirect(new URL('/profile', request.nextUrl.origin));
            }

            if (request.nextUrl.pathname.startsWith("/api/accounts/")) {
                const targetUser = request.nextUrl.pathname.substring(request.nextUrl.pathname.lastIndexOf('/') + 1);
                if (targetUser !== auth!.user.id) {
                    return NextResponse.json({ message: "Cannot get accounts of unowned user." }, { status: 401 })
                }
            }

            return NextResponse.next();
        }
    }
} satisfies NextAuthConfig;