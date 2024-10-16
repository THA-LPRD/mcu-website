'use client';

import {redirect} from 'next/navigation';

export default function SettingsRedirect() {
    // Automatically redirect to /settings/operating-mode
    redirect('/settings/operating-mode');
}
