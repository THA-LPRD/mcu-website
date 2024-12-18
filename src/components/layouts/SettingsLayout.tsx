import React from "react";
import Link from 'next/link';
import {useRouter} from 'next/router';

export default function SettingsLayout({children}: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = router.pathname;

    return (
        <div className="flex min-h-screen w-full flex-col">
            <main
                className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Settings</h1>
                    <div
                        className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                        <nav className="grid gap-4 text-sm text-muted-foreground">
                            <Link
                                href="/settings/device-config"
                                className={pathname === '/settings/device-config' ? 'font-semibold text-primary' : ''}>
                                Device Configuration
                            </Link>
                            <Link
                                href="/settings/http-server"
                                className={pathname === '/settings/http-server' ? 'font-semibold text-primary' : ''}>
                                HTTP Server
                            </Link>
                            <Link
                                href="/settings/advanced"
                                className={pathname === '/settings/advanced' ? 'font-semibold text-primary' : ''}>
                                Advanced
                            </Link>
                        </nav>

                        <div className="grid gap-6">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
