import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ReactNode} from "react";

interface SettingsCardProps {
    children: ReactNode;
    isMutating: boolean;
    title: string;
    description: string;
}

export function SettingsCard({
                                 children,
                                 isMutating,
                                 title,
                                 description,
                             }: SettingsCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button type="submit" disabled={isMutating}>
                    {isMutating ? "Saving..." : "Save"}
                </Button>
            </CardFooter>
        </Card>
    );
}
