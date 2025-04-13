import NextAuth, { NextAuthConfig } from 'next-auth';
import baseConfig from '@/lib/auth.config';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { connectMongoClient } from '@/lib/db';

const config: NextAuthConfig = {
    adapter: MongoDBAdapter(connectMongoClient),
    session: {
        strategy: 'jwt'
    },
    ...baseConfig
}

export const { handlers, signIn, signOut, auth } = NextAuth(config);
