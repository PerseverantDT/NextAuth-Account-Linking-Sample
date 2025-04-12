import { auth } from "@/lib/auth";

export default async function Profile()
{
    const session = await auth();
    if (session === null) {
        return <div>Not authenticated.</div>
    }

    return (
        <div>
            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
        </div>
    )
}