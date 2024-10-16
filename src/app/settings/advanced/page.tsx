'use client';

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {LogLevelSettings} from "./LogLevel";
import {DisplaySettings} from "./Display";

export default function AdvancedSettings() {
    return (
        <div className="grid gap-6">
            <LogLevelSettings/>
            <Card>
                <CardHeader>
                    <CardTitle>Advanced Settings</CardTitle>
                    <CardDescription>
                        Set currently connected display.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4">
                        <DisplaySettings/>
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
