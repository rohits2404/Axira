import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const inter = Inter({subsets:['latin']});

export const metadata: Metadata = {
    title: "Axira",
    description: "Full-stack Jira Clone using Next.js 16 and Appwrite.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
            className={`${inter.className} min-h-screen antialiased`}
            >
                <NuqsAdapter>
                    <QueryProvider>
                        <Toaster richColors closeButton/>
                        {children}
                    </QueryProvider>
                </NuqsAdapter>
            </body>
        </html>
    );
}