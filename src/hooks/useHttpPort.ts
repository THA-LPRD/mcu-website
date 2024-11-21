import React from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "@/hooks/use-toast";
import {ApiService} from "@/utils/apiService";
import {portSchema} from "@/utils/schemas/http-server";

const formSchema = z.object({
    port: portSchema
});

type PortFormValues = z.infer<typeof formSchema>;

export function usePortForm() {
    const [isEditing, setIsEditing] = React.useState(false);
    const [initialLoad, setInitialLoad] = React.useState(true);
    const { toast } = useToast();

    const form = useForm<PortFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            port: ''
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

    const { trigger: setHttpPort, isMutating, error: mutationError } = ApiService.useSetHttpPort();

    const { error: fetchError, isLoading } = ApiService.useHttpPort(
        (port) => {
            if (!isEditing || initialLoad) {
                if (port && !isNaN(parseInt(port.toString()))) {
                    form.setValue("port", port.toString(), {
                        shouldDirty: false,
                        shouldTouch: false
                    });
                } else {
                    console.error("Invalid port received:", port);
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Received invalid port configuration",
                    });
                }

                if (initialLoad) {
                    setInitialLoad(false);
                }
            }
        },
        (err) => {
            console.error("Failed to load HTTP port:", err);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load HTTP port configuration",
            });
        }
    );

    async function onSubmit(data: PortFormValues) {
        try {
            await setHttpPort({ Port: data.port });
            setIsEditing(false);

            toast({
                variant: "default",
                title: "Success",
                description: "HTTP port updated successfully.",
            });
        } catch (error) {
            console.error('HTTP port update failed:', error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: mutationError ? mutationError.message : "There was a problem updating the HTTP port.",
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
