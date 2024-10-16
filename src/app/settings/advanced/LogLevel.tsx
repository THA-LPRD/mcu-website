'use client';

import { LogLevelSelect } from "@/components/LogLevelSelect";
import { SettingsCard } from "@/components/SettingsCard";
import {Form, FormField} from "@/components/ui/form";
import { Toaster } from "@/components/ui/toaster";
import { useLogLevelForm } from "@/hooks/useLogLevel";
import {SkeletonLoaderLog} from "@/app/settings/advanced/SkeletonLoader";

export function LogLevelSettings() {
    const { form, onSubmit, isMutating, isLoading, fetchError } = useLogLevelForm();

    if (isLoading) return <SkeletonLoaderLog />;
    if (fetchError) return <div>Error loading log level</div>;

    return (
        <Form {...form}>
            <Toaster />
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <SettingsCard isMutating={isMutating}>
                    <FormField
                        control={form.control}
                        name="logLevel"
                        render={({ field }) => <LogLevelSelect field={field} />}
                    />
                </SettingsCard>
            </form>
        </Form>
    );
}
