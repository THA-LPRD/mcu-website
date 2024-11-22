import React from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "@/hooks/use-toast";
import {ApiService} from "@/utils/apiService";

const nonEmptyStringSchema = z.object({
    HttpAuthPass: z.string().min(1, {message: "Value cannot be empty"})
});

type AuthPassSchema = z.infer<typeof nonEmptyStringSchema>;

export function useAuthPassForm() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const {toast} = useToast();

    const form = useForm<AuthPassSchema>({
        resolver: zodResolver(nonEmptyStringSchema),
        defaultValues: {
            HttpAuthPass: ''
        }
    });

    const {trigger: setAuthPass, isMutating, error: mutationError} = ApiService.useSetAuthPass();

    async function onSubmit(data: AuthPassSchema) {
        try {
            setIsSubmitting(true);
            await setAuthPass({HttpAuthPass: data.HttpAuthPass});

            form.reset();

            toast({
                variant: "default",
                title: "Success",
                description: "Authentication password updated successfully.",
            });
        } catch (error) {
            console.error("Failed to update authentication password:", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: mutationError ? mutationError.message : "There was a problem updating the authentication password.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    const resetForm = () => {
        form.reset();
    };

    return {
        form,
        onSubmit,
        isMutating,
        isSubmitting,
        resetForm
    };
}
