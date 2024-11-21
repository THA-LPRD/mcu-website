import React from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "@/hooks/use-toast";
import {ApiService} from "@/utils/apiService";

const nonEmptyStringSchema = z.object({
    HttpAuthUser: z.string().min(1, {message: "Value cannot be empty"})
});

type AuthUserSchema = z.infer<typeof nonEmptyStringSchema>;

export function useAuthUserForm() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const {toast} = useToast();

    const form = useForm<AuthUserSchema>({
        resolver: zodResolver(nonEmptyStringSchema),
        defaultValues: {
            HttpAuthUser: ''
        }
    });

    const {trigger: setAuthUser, isMutating, error: mutationError} = ApiService.useSetAuthUser();

    async function onSubmit(data: AuthUserSchema) {
        if (!data.HttpAuthUser.trim()) {
            form.setError('HttpAuthUser', {
                type: 'manual',
                message: 'Username cannot be empty'
            });
            return;
        }

        try {
            setIsSubmitting(true);
            await setAuthUser({HttpAuthUser: data.HttpAuthUser.trim()});

            form.reset();

            toast({
                variant: "default",
                title: "Success",
                description: "Authentication username updated successfully.",
            });
        } catch (error) {
            console.error("Failed to update authentication username: ", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: mutationError ? mutationError.message : "There was a problem updating the authentication username.",
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
