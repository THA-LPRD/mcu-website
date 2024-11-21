import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {Spinner} from "@/components/ui/spinner";

export default function SettingsIndex() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/settings/device-config').catch((err) => {
            console.error('Navigation failed:', err);
        });
    }, [router]);

    return <Spinner size="large" className={"mt-5"}>Loading...</Spinner>;
}
