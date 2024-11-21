import React from 'react';
import SettingsLayout from '@/components/layouts/SettingsLayout';
import {LogLevelSettings} from "@/components/settings/advanced/LogLevel";
import {DisplaySettings} from "@/components/settings/advanced/Display";

export default function AdvancedSettingsPage() {
    return (
        <SettingsLayout>
            <div className="grid gap-6">
                <LogLevelSettings/>
                <DisplaySettings/>
            </div>
        </SettingsLayout>
    )
}
