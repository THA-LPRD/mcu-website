"use client"

import * as React from "react";
import {ReloadIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip";
import {LoadingSpinner} from "@/components/ui/loading-spinner";

export default function RestartButton() {
    const [isRestarting, setIsRestarting] = React.useState(false);

    const handleRestart = async () => {
        setIsRestarting(true);

        // Simulate a restart process (for 5 seconds)
        await new Promise((resolve) => setTimeout(resolve, 5000));

        // Simulate coming back online
        setIsRestarting(false);
    };

    return (
        <>
            {/* Fullscreen Overlay */}
            {isRestarting && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 !m-0">
                    <div className="flex flex-col items-center">
                        <LoadingSpinner size={48} className="text-white mb-4"/>
                        <p className="text-white text-lg">Restarting the Device...</p>
                    </div>
                </div>
            )}

            {/* Restart Button */}
            <TooltipProvider delayDuration={300}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={handleRestart} className="bg-muted border-muted">
                            <ReloadIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-100 transition-all"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent align="end" className="border mr-4">
                        <p>Restart Device</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    );
}
