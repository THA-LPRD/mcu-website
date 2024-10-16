'use client';

import {useEffect, useState} from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {HTTPSSwitch} from './HTTPSSwitch';
import {HTTPSContents} from './HTTPSContents';
import {SkeletonLoaderHTTPS} from './SkeletonLoader'
import {ApiService} from '@/utils/apiService';

interface HTTPSServerSettingsProps {
    onLoad: (loaded: boolean) => void;
}

export function HTTPSServerSettings({onLoad}: HTTPSServerSettingsProps) {
    const [selectedHttps, setSelectedHttps] = useState<boolean | null>(null);
    const [httpsPort, setHttpsPort] = useState<string | null>(null);
    const {data: httpsStatus, error: error1, isLoading: loading1} = ApiService.useHttpsStatus();
    const {data: fetchedHttpsPort, error: error2, isLoading: loading2} = ApiService.useHttpsPort();

    useEffect(() => {
        if (!loading1 && !loading2) {
            if (error1 || error2) {
                console.error('Error fetching HTTPS settings:', error1, error2);
                onLoad(false);
            } else {
                setSelectedHttps(!Boolean(httpsStatus));
                setHttpsPort(fetchedHttpsPort ?? null);
                onLoad(true);
            }
        }
    }, [loading1, loading2, httpsStatus, fetchedHttpsPort, error1, error2, onLoad]);

    if (loading1 || loading2) return <SkeletonLoaderHTTPS/>;
    if (error1 || error2) return <div>Error loading HTTPS settings</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>HTTPS Server</CardTitle>
                <CardDescription>
                    Configure the HTTPS server settings.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-4">
                    <HTTPSSwitch enabled={selectedHttps} onChange={setSelectedHttps}/>
                    {selectedHttps && <HTTPSContents initialPort={httpsPort}/>}
                </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
            </CardFooter>
        </Card>
    );
}
