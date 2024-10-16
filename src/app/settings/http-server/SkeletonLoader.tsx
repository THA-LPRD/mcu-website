import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export const SkeletonLoaderHTTP = () => (
    <Card>
        <CardHeader>
            <CardTitle>Loading Http State...</CardTitle>
            <CardDescription>Please wait while the settings are being fetched.</CardDescription>
        </CardHeader>
        <CardContent>
            <Skeleton className="h-10 w-full mb-4"/>
        </CardContent>
    </Card>
);

export const SkeletonLoaderHTTPS = () => (
    <Card>
        <CardHeader>
            <CardTitle>Loading Https State...</CardTitle>
            <CardDescription>Please wait while the settings are being fetched.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center space-x-4 mb-4">
                <Skeleton className="w-12 h-6 rounded-full"/>
                <Skeleton className="w-32 h-4 rounded-full"/>
            </div>
            <Skeleton className="h-10 w-full mb-4"/>
            <Skeleton className="h-10 w-full mb-4"/>
            <Skeleton className="h-10 w-full"/>
        </CardContent>
    </Card>
);
