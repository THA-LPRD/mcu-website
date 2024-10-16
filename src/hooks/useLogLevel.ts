/* eslint-disable @typescript-eslint/no-unused-vars */
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import {useToast} from "@/hooks/use-toast";
import {ApiService} from "@/utils/apiService";
import {LogLevel, logSchema} from "@/utils/schemas/application";

export function useLogLevelForm() {
    const form = useForm<z.infer<typeof logSchema>>({
        resolver: zodResolver(logSchema),
    });

    const {toast} = useToast();
    const {trigger: setLogLevel, isMutating, error: mutationError} = ApiService.useSetLogLevel();

    const {error: fetchError, isLoading} = ApiService.useLogLevel(
        (logLevel) => {
            if (Object.values(LogLevel).includes(logLevel as LogLevel)) {
                form.setValue("logLevel", logLevel as LogLevel);
            } else {
                console.error("Invalid log level received:", logLevel);
            }
        },
        (err) => console.error("Failed to load log level:", err)
    );

    async function onSubmit(data: z.infer<typeof logSchema>) {
        try {
            await setLogLevel({LogLevel: data.logLevel});
            toast({
                variant: "default",
                title: "Success",
                description: "Log level updated successfully.",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: mutationError ? mutationError.message : "There was a problem updating the log level.",
            });
        }
    }

    return {
        form,
        onSubmit,
        isMutating,
        isLoading,
        fetchError,
    };
}

/* eslint-enable @typescript-eslint/no-unused-vars */
