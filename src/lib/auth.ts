import NextAuth, { NextAuthConfig } from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { connectMongoClient } from '@/lib/db';

const config: NextAuthConfig = (() => {
    return  {
        adapter: MongoDBAdapter(connectMongoClient),
        providers: []
    }
})();

export const { handlers, signIn, signOut, auth } = NextAuth(config);
