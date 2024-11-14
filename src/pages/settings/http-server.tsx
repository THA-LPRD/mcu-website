// pages/settings/http-server/index.tsx
import React, { useState } from 'react';
import SettingsLayout from '@/components/layouts/SettingsLayout';
import { AuthenticationSettings } from '@/components/settings/http-server/Authentication';
import { HTTPServerSettings } from '@/components/settings/http-server/HTTPServer';
import { HTTPSServerSettings } from '@/components/settings/http-server/HTTPSServer';
import { SkeletonLoaderHTTP, SkeletonLoaderHTTPS } from '@/components/settings/http-server/SkeletonLoader';

export default function HTTPServerPage() {
    const [isHttpLoaded, setIsHttpLoaded] = useState(false);
    const [isHttpsLoaded, setIsHttpsLoaded] = useState(false);

    // Function to update the HTTP loading state
    const handleHttpLoad = (loaded: boolean) => {
        setIsHttpLoaded(loaded);
    };

    // Function to update the HTTPS loading state
    const handleHttpsLoad = (loaded: boolean) => {
        setIsHttpsLoaded(loaded);
    };

    return (
        <SettingsLayout>
            <div className="grid gap-6">
                <AuthenticationSettings />
                {!isHttpLoaded && <SkeletonLoaderHTTP />}
                <HTTPServerSettings onLoad={handleHttpLoad} />

                {!isHttpsLoaded && <SkeletonLoaderHTTPS />}
                <HTTPSServerSettings onLoad={handleHttpsLoad} />
            </div>
        </SettingsLayout>
    );
}
