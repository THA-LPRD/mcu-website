import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export const SkeletonLoader = () => (
    <Card>
        <CardHeader>
            <CardTitle>Loading Operating Mode...</CardTitle>
            <CardDescription>Please wait while the settings are being fetched.</CardDescription>
        </CardHeader>
        <CardContent>
            <Skeleton className="h-10 w-[190px] mb-4"/>
            <Skeleton className="h-10 w-full"/>
            <Card className="mt-2">
                <CardContent className="mt-4">
                    <Skeleton className="h-3 w-full mb-4"/>
                    <Skeleton className="h-10 w-full mb-4"/>
                    <Skeleton className="h-10 w-full"/>
                </CardContent>
            </Card>
        </CardContent>
    </Card>
);
