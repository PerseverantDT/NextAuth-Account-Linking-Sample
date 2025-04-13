import { connectMongoClient } from "@/lib/db";
import { ObjectId } from "mongodb";
import { Account } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{id: string}> }) : Promise<NextResponse>
{
    const { id } = await params;

    const database = connectMongoClient().db();
    const accounts = await database.collection('accounts').find<Account>({ userId: new ObjectId(id) }).toArray();

    return NextResponse.json(accounts.map((account) => {
        return {
            userId: account.userId,
            provider: account.provider,
            accountId: account.providerAccountId
        };
    }));
}
