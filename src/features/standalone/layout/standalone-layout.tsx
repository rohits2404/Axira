import { Logo } from "@/components/logo";
import { SourceCode } from "@/components/source-code";
import { UserButton } from "@/features/auth/components/user-button";
import React from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="min-h-screen bg-neutral-100">
            <div className="mx-auto max-w-screen-2xl px-4">
                <nav className="flex h-18.25 items-center justify-between">
                    <Logo/>
                    <div className="flex items-center gap-x-2.5">
                        <UserButton />
                        <SourceCode />
                    </div>
                </nav>
                <div className="flex flex-col items-center justify-center py-4">{children}</div>
            </div>
        </main>
    );
}