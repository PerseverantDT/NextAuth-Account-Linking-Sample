import { connectMongoClient } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{id: string}> }) : Promise<NextResponse>
{
    const { id } = await params;

    const database = connectMongoClient().db();
    const accounts = await database.collection('accounts').find({ userId: new ObjectId(id) }).toArray();

    return NextResponse.json(accounts);
}
