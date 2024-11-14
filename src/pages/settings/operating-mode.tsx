import React, { useState } from 'react';
import SettingsLayout from '@/components/layouts/SettingsLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkeletonLoader } from '@/components/settings/operating-mode/SkeletonLoader';
import { ModeTabs } from '@/components/settings/operating-mode/ModeTabs';
import { SelectMode } from '@/components/settings/operating-mode/SelectMode';
import { ApiService } from '@/utils/apiService';

export default function OperatingModePage() {
    const [selectedMode, setSelectedMode] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string | null>(null);

    const { error, isLoading } = ApiService.useOperatingMode(
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

    if (isLoading) return (
        <SettingsLayout>
            <SkeletonLoader />
        </SettingsLayout>
    );
    
    if (error) return (
        <SettingsLayout>
            <div>Error loading mode</div>
        </SettingsLayout>
    );

    return (
        <SettingsLayout>
            <Card>
                <CardHeader>
                    <CardTitle>Operating Mode</CardTitle>
                    <CardDescription>Configure the operating mode of the device.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SelectMode selectedMode={selectedMode} onSelectChange={handleModeChange} />
                    <ModeTabs activeTab={activeTab} onTabChange={setActiveTab} selectedMode={selectedMode} />
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
        </SettingsLayout>
    );
}
