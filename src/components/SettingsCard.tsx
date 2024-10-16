import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface AdvancedSettingsCardProps {
    children: ReactNode;
    isMutating: boolean;
}

export function SettingsCard({ children, isMutating }: AdvancedSettingsCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Set the Log Level.</CardDescription>
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
