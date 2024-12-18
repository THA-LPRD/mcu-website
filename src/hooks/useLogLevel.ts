import React from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import {useToast} from "@/hooks/use-toast";
import {ApiService} from "@/utils/apiService";
import {LogLevel, logSchema} from "@/utils/schemas/application";

export function useLogLevelForm() {
    const [isEditing, setIsEditing] = React.useState(false);
    const [initialLoad, setInitialLoad] = React.useState(true);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof logSchema>>({
        resolver: zodResolver(logSchema),
        defaultValues: {
            logLevel: undefined
        }
    });

    React.useEffect(() => {
        const subscription = form.watch(() => {
            if (!isEditing && !initialLoad) {
                setIsEditing(true);
            }
        });

        return () => subscription.unsubscribe();
    }, [form, isEditing, initialLoad]);

    const { trigger: setLogLevel, isMutating, error: mutationError } = ApiService.useSetLogLevel();

    const { error: fetchError, isLoading } = ApiService.useLogLevel(
        (logLevel) => {
            if (!isEditing || initialLoad) {
                if (Object.values(LogLevel).includes(logLevel as LogLevel)) {
                    form.setValue("logLevel", logLevel as LogLevel, {
                        shouldDirty: false,
                        shouldTouch: false
                    });
                } else {
                    console.error("Invalid log level received:", logLevel);
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Received invalid log level configuration",
                    });
                }

                if (initialLoad) {
                    setInitialLoad(false);
                }
            }
        },
        (err) => {
            console.error("Failed to load log level:", err);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load log level configuration",
            });
        }
    );

    async function onSubmit(data: z.infer<typeof logSchema>) {
        try {
            await setLogLevel({ LogLevel: data.logLevel });
            setIsEditing(false);

            toast({
                variant: "default",
                title: "Success",
                description: "Log level updated successfully.",
            });
        } catch (error) {
            console.error("Failed to update log level:", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: mutationError ? mutationError.message : "There was a problem updating the log level.",
            });
        }
    }

    const resetForm = () => {
        form.reset();
        setIsEditing(false);
    };

    return {
        form,
        onSubmit,
        isMutating,
        isLoading,
        fetchError,
        isEditing,
        resetForm
    };
}
