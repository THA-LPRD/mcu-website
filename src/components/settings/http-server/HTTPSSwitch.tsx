import React from 'react';
import {Switch} from "@/components/ui/switch"
import {Label} from "@/components/ui/label";

type EnableHTTPSProps = {
    enabled: boolean | null;
    onChange: (value: boolean) => void;
}

export function HTTPSSwitch({enabled, onChange}: EnableHTTPSProps) {
    return (
        <div className="flex items-center space-x-2">
            <Switch
                id="https"
                checked={enabled || false}
                onCheckedChange={onChange}
            />
            <Label htmlFor="https">Enable HTTPS</Label>
        </div>
    );
}