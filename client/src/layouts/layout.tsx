import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import React from "react"

export const Layout = ({ children }: { children: React.ReactNode}) => {
    return(
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col-reverse md:flex-row">
                <Navigation />
                <div className="flex-1 px-2 py-3 md:p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}