import React from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import {useToast} from "@/hooks/use-toast";
import {ApiService} from "@/utils/apiService";
import {DisplayDriver, DisplayDriverSchema} from "@/utils/schemas/application";

export function useDisplayDriverForm() {
    const [isEditing, setIsEditing] = React.useState(false);
    const [initialLoad, setInitialLoad] = React.useState(true);
    const {toast} = useToast();

    const form = useForm<z.infer<typeof DisplayDriverSchema>>({
        resolver: zodResolver(DisplayDriverSchema),
        defaultValues: {
            displayDriver: undefined
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

    const {trigger: setDisplayDriver, isMutating, error: mutationError} = ApiService.useSetDisplayDriver();

    const {error: fetchError, isLoading} = ApiService.useDisplayDriver(
        (displayDriver) => {
            if (!isEditing || initialLoad) {
                if (Object.values(DisplayDriver).includes(displayDriver as DisplayDriver)) {
                    form.setValue("displayDriver", displayDriver as DisplayDriver, {
                        shouldDirty: false,
                        shouldTouch: false
                    });
                } else {
                    console.error("Invalid display driver received:", displayDriver);
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Received invalid display driver configuration",
                    });
                }

                if (initialLoad) {
                    setInitialLoad(false);
                }
            }
        },
        (err) => {
            console.error("Failed to load Display Driver:", err);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load display driver configuration",
            });
        }
    );

    async function onSubmit(data: z.infer<typeof DisplayDriverSchema>) {
        try {
            await setDisplayDriver({DisplayDriver: data.displayDriver});
            setIsEditing(false);

            toast({
                variant: "default",
                title: "Success",
                description: "Display driver updated successfully.",
            });
        } catch (error) {
            console.error("Failed to update Display Driver:", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: mutationError ? mutationError.message : "There was a problem updating the Display Driver.",
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
