// src/app/page.tsx

"use client"
import { SessionProvider } from "next-auth/react"
import Auth from "../components/auth"

export default function Home() {
    return (
        <SessionProvider>
            <Auth />
        </SessionProvider>
    )
}