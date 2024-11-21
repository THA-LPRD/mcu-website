import React from 'react';
import {Form, FormField} from "@/components/ui/form";
import {Toaster} from "@/components/ui/toaster";
import {usePortForm} from "@/hooks/useHttpPort";
import {SettingsCard} from "@/components/SettingsCard";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {SkeletonLoaderHTTP} from "@/components/settings/http-server/SkeletonLoader";

interface HTTPServerSettingsProps {
    onLoad: (loaded: boolean) => void;
}

export function HTTPServerSettings({onLoad}: HTTPServerSettingsProps) {
    const {form, onSubmit, isMutating, isLoading, fetchError} = usePortForm();

    React.useEffect(() => {
        if (!isLoading) {
            onLoad(true);
        }
    }, [isLoading, onLoad]);

    if (isLoading) return <SkeletonLoaderHTTP/>
    if (fetchError) return <div>Error loading http port</div>;

    return (
        <Form {...form}>
            <Toaster/>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <SettingsCard
                    isMutating={isMutating}
                    title="HTTP Server"
                    description="Configure the HTTP server settings."
                >
                    <FormField
                        control={form.control}
                        name="port"
                        render={({field}) => (
                            <div className="space-y-1">
                                <Label htmlFor="http-port">Port</Label>
                                <Input
                                    type="number"
                                    id="http-port"
                                    placeholder="80"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            </div>
                        )}
                    />
                </SettingsCard>
            </form>
        </Form>
    );
}
