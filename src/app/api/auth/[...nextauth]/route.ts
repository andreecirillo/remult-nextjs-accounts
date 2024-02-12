// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { getServerSession } from "next-auth/next"
import Credentials from "next-auth/providers/credentials"
import { UserInfo } from "remult"

const validUsers: UserInfo[] = [
    { id: "1", name: "Andre" }
]
function findUser(name?: string | null) {
    return validUsers.find((user) => user.name === name)
}

const auth = NextAuth({
    providers: [
        Credentials({
            credentials: {
                name: {
                    placeholder: "Try Andre"
                }
            },
            authorize: (credentials) => findUser(credentials?.name) || null
        })
    ],
    callbacks: {
        session: ({ session }) => ({
            ...session,
            user: findUser(session.user?.name)
        })
    }
})
export { auth as GET, auth as POST }

export async function getUserOnServer() {
    const session = await getServerSession()
    return findUser(session?.user?.name)
}