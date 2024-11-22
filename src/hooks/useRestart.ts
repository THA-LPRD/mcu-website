import React from "react";
import {useToast} from "@/hooks/use-toast";
import {ApiService} from "@/utils/apiService";

export function useRestart() {
    const [isRestarting, setIsRestarting] = React.useState(false);
    const {toast} = useToast();

    const {trigger: triggerRestart, isMutating} = ApiService.useRestart();
    const {} = ApiService.useDeviceInfo(
        // onSuccess callback
        () => {
            if (isRestarting) {
                setIsRestarting(false);
                toast({
                    variant: "default",
                    title: "Success",
                    description: "Device has restarted successfully.",
                });
            }
        },
        // onError callback
        () => {
            if (!isRestarting) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Failed to check device status.",
                });
            }
        }
    );

    async function handleRestart() {
        try {
            setIsRestarting(true);
            await triggerRestart();

            toast({
                variant: "default",
                title: "Restarting",
                description: "Device is restarting. Please wait...",
            });
        } catch (error) {
            console.error('Restarting device failed:', error)
            setIsRestarting(false);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem restarting the device.",
            });
        }
    }

    return {
        handleRestart,
        isRestarting: isRestarting || isMutating,
    };
}
