'use client';

import {useState} from 'react';
import {AuthenticationSettings} from "./Authentication"
import {HTTPServerSettings} from './HTTPServer';
import {HTTPSServerSettings} from './HTTPSServer';
import {SkeletonLoaderHTTP, SkeletonLoaderHTTPS} from './SkeletonLoader';

export default function HTTPServer() {
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
        <div className="grid gap-6">
            <AuthenticationSettings/>
            {!isHttpLoaded && <SkeletonLoaderHTTP/>}
            <HTTPServerSettings onLoad={handleHttpLoad}/>

            {!isHttpsLoaded && <SkeletonLoaderHTTPS/>}
            <HTTPSServerSettings onLoad={handleHttpsLoad}/>
        </div>
    );
}
