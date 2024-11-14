import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export function SkeletonLoaderLog() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Loading Log Level...</CardTitle>
                <CardDescription>Please wait while the settings are being fetched.</CardDescription>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-10 w-full mb-4"/>
            </CardContent>
        </Card>
    );
}

export function SkeletonLoaderDisplay() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Loading Display Model...</CardTitle>
                <CardDescription>Please wait while the settings are being fetched.</CardDescription>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-10 w-full mb-4"/>
            </CardContent>
        </Card>
    );
}
