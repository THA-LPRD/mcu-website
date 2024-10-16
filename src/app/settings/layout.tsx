'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React from "react";
import {LoadingSpinner} from "@/components/ui/loading-spinner";

export default function SettingsLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen w-full flex-col">
            <main
                className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Settings</h1>
                    <React.Suspense fallback={<LoadingSpinner size={48} className="mx-auto my-8"/>}>
                        <div
                            className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                            <nav className="grid gap-4 text-sm text-muted-foreground">
                                <Link href="/settings/operating-mode"
                                      className={pathname === '/settings/operating-mode' ? 'font-semibold text-primary' : ''}>
                                    Operating Mode
                                </Link>
                                <Link href="/settings/http-server"
                                      className={pathname === '/settings/http-server' ? 'font-semibold text-primary' : ''}>
                                    HTTP Server
                                </Link>
                                <Link href="/settings/advanced"
                                      className={pathname === '/settings/advanced' ? 'font-semibold text-primary' : ''}>
                                    Advanced
                                </Link>
                            </nav>

                            <div className="grid gap-6">
                                {children}
                            </div>
                        </div>
                    </React.Suspense>
                </div>
            </main>


        </div>
    );
}
