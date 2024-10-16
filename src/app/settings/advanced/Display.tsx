'use client';

import {useState} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {SkeletonLoaderDisplay} from './SkeletonLoader';
import {ApiService} from '@/utils/apiService';

export function DisplaySettings() {
    const [selectedDisplay, setSelectedDisplay] = useState<string | null>(null);

    const {data: fetchedDisplay, error, isLoading} = ApiService.useDisplayDriver(
        (fetchedDisplay) => setSelectedDisplay(fetchedDisplay),
        (err) => console.error('Failed to load display driver:', err)
    );

    if (isLoading) return <SkeletonLoaderDisplay/>;
    if (error) return <div>Error loading https port</div>;

    return (
        <div className="space-y-1">
            <Select value={selectedDisplay || undefined} onValueChange={setSelectedDisplay}>
                <Label htmlFor="displayModel">Display Model</Label>
                <SelectTrigger className="w-[180px]">
                    <SelectValue>{fetchedDisplay}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="WS_7IN3G">WS_7IN3G</SelectItem>
                    <SelectItem value="WS_9IN7">WS_9IN7</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}