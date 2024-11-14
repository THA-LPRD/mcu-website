import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SettingsIndex() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/settings/operating-mode');
    }, [router]);

    return null; // or a loading spinner
}
