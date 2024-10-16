'use client';

import {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

interface HTTPSContentsProps {
    initialPort: string | null;
}

export function HTTPSContents({initialPort}: HTTPSContentsProps) {
    const [selectedHttpsPort, setSelectedPort] = useState<string | null>(initialPort);

    return (
        <>
            <div className="space-y-1">
                <Label htmlFor="https-port">Port</Label>
                <Input
                    type="number"
                    id="https-port"
                    value={selectedHttpsPort || ""}
                    onChange={(e) => setSelectedPort(e.target.value)}
                />
            </div>
            <div className="space-y-1">
                <Label htmlFor="cert">Certificate</Label>
                <Input type="file" id="cert"/>
            </div>
            <div className="space-y-1">
                <Label htmlFor="key">Key</Label>
                <Input type="file" id="key"/>
            </div>
        </>
    );
}

