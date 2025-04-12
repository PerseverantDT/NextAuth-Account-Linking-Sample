import NextAuth, { NextAuthConfig } from 'next-auth';

const config: NextAuthConfig = (() => {
    return  {
        providers: []
    }
})();

export const { handlers, signIn, signOut, auth } = NextAuth(config);
