import React from 'react';
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Toaster} from "@/components/ui/toaster";
import {SettingsCard} from "@/components/SettingsCard";
import {Input} from "@/components/ui/input";
import {useAuthUserForm} from "@/hooks/useAuthUser";
import {useAuthPassForm} from "@/hooks/useAuthPass";

export function AuthenticationSettings() {
    const {
        form: formUser,
        onSubmit: onSubmitUser,
        isMutating: isMutatingUser
    } = useAuthUserForm();

    const {
        form: formPass,
        onSubmit: onSubmitPass,
        isMutating: isMutatingPass
    } = useAuthPassForm();

    const handleSubmit = async () => {
        const userValue = formUser.getValues().HttpAuthUser;
        const passValue = formPass.getValues().HttpAuthPass;

        // If both empty, do nothing
        if (!userValue && !passValue) {
            return;
        }

        // Handle username if present
        if (userValue) {
            const userResult = await formUser.trigger();
            if (userResult) {
                await onSubmitUser({HttpAuthUser: userValue});
            }
        }

        // Handle password if present
        if (passValue) {
            const passResult = await formPass.trigger();
            if (passResult) {
                await onSubmitPass({HttpAuthPass: passValue});
            }
        }
    };

    return (
        <Form {...formUser}>
            <Toaster/>
            <form onSubmit={async (e) => {
                e.preventDefault();
                await handleSubmit();
            }} className="flex flex-col gap-4">
                <SettingsCard
                    isMutating={isMutatingUser || isMutatingPass}
                    title="Authentication"
                    description="Configure the HTTP server authentication."
                >
                    <div className="space-y-4">
                        <FormField
                            control={formUser.control}
                            name="HttpAuthUser"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Username"
                                        className="w-[180px]"
                                    />
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={formPass.control}
                            name="HttpAuthPass"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Password"
                                        className="w-[180px]"
                                    />
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </SettingsCard>
            </form>
        </Form>
    );
}
