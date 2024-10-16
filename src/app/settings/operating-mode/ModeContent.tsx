import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

type ModeContentProps = {
    mode: string;
    selectedMode: string | null;
};

export const ModeContent = ({mode, selectedMode}: ModeContentProps) => (
    <Card>
        <CardHeader>
            <CardDescription>
                {selectedMode === mode ? 'Configure the Connection settings for the device.' :
                    'Save button will apply across all tabs. If you don\'t want to change the settings, do not type anything.'}
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            <form className="flex flex-col gap-4">
                <div className="space-y-1">
                    <Label htmlFor="ssid">SSID</Label>
                    <Input type="text" id="ssid" placeholder="SSID"/>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" placeholder="Password"/>
                </div>
                {mode === 'Server' && (
                    <div className="space-y-1">
                        <Label htmlFor="url">Server URL</Label>
                        <Input type="url" id="url" placeholder="example.com"/>
                    </div>
                )}
            </form>
        </CardContent>
    </Card>
);
