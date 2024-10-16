'use client';

import {useState} from 'react';
import {SkeletonLoader} from './SkeletonLoader';
import {ModeTabs} from './ModeTabs';
import {SelectMode} from './SelectMode';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ApiService} from '@/utils/apiService';

export default function OperatingModeSettings() {
    const [selectedMode, setSelectedMode] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string | null>(null);

    const {error, isLoading} = ApiService.useOperatingMode(
        (fetchedMode) => {
            setSelectedMode(fetchedMode);
            setActiveTab(fetchedMode);
        },
        (err) => console.error('Failed to load operating mode:', err)
    );

    const handleModeChange = (newMode: string) => {
        setSelectedMode(newMode);
        setActiveTab(newMode);
    };

    if (isLoading) return <SkeletonLoader/>;
    if (error) return <div>Error loading mode</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Operating Mode</CardTitle>
                <CardDescription>Configure the operating mode of the device.</CardDescription>
            </CardHeader>
            <CardContent>
                <SelectMode selectedMode={selectedMode} onSelectChange={handleModeChange}/>
                <ModeTabs activeTab={activeTab} onTabChange={setActiveTab} selectedMode={selectedMode}/>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
            </CardFooter>
        </Card>
    );
}

