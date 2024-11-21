import React from "react";
import {ReloadIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Spinner} from "@/components/ui/spinner";
import {useRestart} from "@/hooks/useRestart";

export default function RestartButton() {
    const {handleRestart, isRestarting} = useRestart();

    return (
        <>
            {isRestarting && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 !m-0">
                    <div className="flex flex-col items-center">
                        <Spinner size="large" className="text-white mb-4"/>
                        <span className="text-white">Restarting the Device...</span>
                    </div>
                </div>
            )}

            <TooltipProvider delayDuration={300}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleRestart}
                            disabled={isRestarting}
                            className="bg-muted border-muted"
                        >
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
