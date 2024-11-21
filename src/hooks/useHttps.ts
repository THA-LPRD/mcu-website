import React from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "@/hooks/use-toast";
import {ApiService} from "@/utils/apiService";
import type {HttpsResponse, HttpsUpdateRequest} from '@/types/https';

export type HttpsFormData = z.infer<typeof httpsUpdateSchema>;

const httpsUpdateSchema = z.object({
    Enabled: z.boolean(),
    Port: z.number().int().min(1).max(65534).optional(),
    Cert: z.string().optional(),
    Key: z.string().optional()
}).refine(data => {
    if (data.Enabled) {
        if (data.Cert && !data.Key) return false;
        if (!data.Cert && data.Key) return false;
    }
    return true;
}, {
    message: "Both certificate and key are required when enabling HTTPS"
});

export function useHttpsForm() {
    const [isEditing, setIsEditing] = React.useState(false);
    const [initialLoad, setInitialLoad] = React.useState(true);
    const {toast} = useToast();

    const form = useForm<HttpsFormData>({
        resolver: zodResolver(httpsUpdateSchema),
        defaultValues: {
            Enabled: false,
            Port: 443,
            Cert: '',
            Key: ''
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

    const {trigger: setHttps, isMutating, error: mutationError} = ApiService.useSetHttps();

    const {error: fetchError, isLoading} = ApiService.useHttpsStatus(
        (httpsStatus: HttpsResponse) => {
            if (!isEditing || initialLoad) {
                form.setValue("Enabled", httpsStatus.Enabled, {shouldDirty: false});
                form.setValue("Port", httpsStatus.Port, {shouldDirty: false});

                if (httpsStatus.HasCert && httpsStatus.HasKey) {
                    form.setValue("Cert", "", {shouldDirty: false});
                    form.setValue("Key", "", {shouldDirty: false});
                }

                if (initialLoad) {
                    setInitialLoad(false);
                }
            }
        },
        (err) => {
            console.error("Failed to load HTTPS status:", err);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load HTTPS configuration",
            });
        }
    );

    async function onSubmit(data: HttpsFormData) {
        try {
            const updateRequest: HttpsUpdateRequest = {
                Enabled: data.Enabled,
                Port: data.Port,
                ...(data.Cert && {Cert: data.Cert}),
                ...(data.Key && {Key: data.Key})
            };

            await setHttps(updateRequest);
            setIsEditing(false);

            toast({
                variant: "default",
                title: "Success",
                description: "HTTPS settings updated successfully.",
            });
        } catch (error) {
            console.error('HTTPS configuration update failed:', error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: mutationError ? mutationError.message : "There was a problem updating the HTTPS settings.",
            });
        }
    }

    // Handle form reset
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
