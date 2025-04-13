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
        async authorized({ request, auth }): Promise<boolean | NextResponse> {
            console.log(`[Middleware] Request URL: ${request.nextUrl.pathname}`);
            console.log(`[Middleware] Auth object:`, auth);

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
                    console.log(`[Middleware] Path ${request.nextUrl.pathname} requires auth.`);
                    if (auth === null || auth.user === undefined) {
                        console.log(`[Middleware] Auth missing for protected route. Redirecting to signin.`);
                        return NextResponse.redirect(new URL('/api/auth/signin', request.nextUrl.origin));
                    }
                    console.log(`[Middleware] Auth found for protected route.`);
                    break;
                }
            }

            if (request.nextUrl.pathname === '/' && auth !== null && auth.user !== undefined) {
                return NextResponse.redirect(new URL('/profile', request.nextUrl.origin));
            }

            if (request.nextUrl.pathname.startsWith("/api/accounts/")) {
                console.log(`[Middleware] Checking ownership for /api/accounts/`);
                if (!auth?.user) {
                    console.error(`[Middleware] Auth missing for /api/accounts/ check!`);
                    return NextResponse.json({ message: "Authentication required or user data missing." }, { status: 403 });
                }

                const targetUser = request.nextUrl.pathname.substring(request.nextUrl.pathname.lastIndexOf('/') + 1);
                if (targetUser !== auth.user.id) {
                    console.warn(`[Middleware] User ${auth.user.id} attempting to access accounts for ${targetUser}. Denying.`);
                    return NextResponse.json({ message: "Cannot get accounts of unowned user." }, { status: 401 })
                }
                console.log(`[Middleware] Ownership check passed for /api/accounts/`);
            }

            console.log(`[Middleware] Allowing request to proceed.`);
            return NextResponse.next();
        }
    }
} satisfies NextAuthConfig;