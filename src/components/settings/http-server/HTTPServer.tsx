import React, {useState} from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {ApiService} from '@/utils/apiService';

interface HTTPServerSettingsProps {
    onLoad: (loaded: boolean) => void;
}

export function HTTPServerSettings({onLoad}: HTTPServerSettingsProps) {
    const [selectedHttpPort, setSelectedPort] = useState<string | null>(null);
    const {error, isLoading} = ApiService.useHttpPort(
        (fetchedHttpPort) => {
            setSelectedPort(fetchedHttpPort);
            onLoad(true);
        },
        (err) => {
            console.error('Failed to fetch HTTP status:', err);
            onLoad(true);
        }
    );

    if (isLoading) return null;
    if (error) return <div>Error loading http port</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>HTTP Server</CardTitle>
                <CardDescription>Configure the HTTP server settings.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="space-y-1">
                        <Label htmlFor="http-port">Port</Label>
                        <Input
                            type="number"
                            id="http-port"
                            placeholder="80"
                            value={selectedHttpPort || ''}
                            onChange={(e) => setSelectedPort(e.target.value)}
                        />
                    </div>
                </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
            </CardFooter>
        </Card>
    );
}
