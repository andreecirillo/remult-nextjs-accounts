// src/components/auth.tsx

import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect } from "react"
import { UserInfo, remult } from "remult"
import Balance from "./balance"

export default function Auth() {
    const session = useSession()
    remult.user = session.data?.user as UserInfo

    useEffect(() => {
        if (session.status === "unauthenticated") signIn()
    }, [session])
    if (session.status !== "authenticated") return <></>
    return (
        <div>
            Hello {remult.user?.name}{" "}
            <button onClick={() => signOut()}>Sign Out</button>
            <Balance />
        </div>
    )
}