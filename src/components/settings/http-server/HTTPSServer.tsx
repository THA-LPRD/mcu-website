import React from 'react';
import {Switch} from "@/components/ui/switch";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {SettingsCard} from "@/components/SettingsCard";
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Toaster} from "@/components/ui/toaster";
import {useHttpsForm} from "@/hooks/useHttps";
import {SkeletonLoaderHTTPS} from './SkeletonLoader';

interface HTTPSServerSettingsProps {
    onLoad: (loaded: boolean) => void;
}

export function HTTPSServerSettings({onLoad}: HTTPSServerSettingsProps) {
    const {form, onSubmit, isMutating, isLoading, fetchError} = useHttpsForm();
    const isEnabled = form.watch("Enabled");

    React.useEffect(() => {
        if (!isLoading) {
            onLoad(true);
        }
    }, [isLoading, onLoad]);

    if (isLoading) return <SkeletonLoaderHTTPS/>;
    if (fetchError) return <div>Error loading HTTPS settings</div>;
    return (
        <Form {...form}>
            <Toaster/>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <SettingsCard
                    isMutating={isMutating}
                    title="HTTPS Server"
                    description="Configure the HTTPS server settings."
                >
                    <FormField
                        control={form.control}
                        name="Enabled"
                        render={({field}) => (
                            <FormItem className="flex items-center space-x-2">
                                <FormLabel>Enable HTTPS</FormLabel>
                                <Switch
                                    id="https"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="Port"
                        render={({field}) => (
                            <FormItem className="space-y-1">
                                <FormLabel className={!isEnabled ? "text-muted-foreground" : ""}>
                                    Port
                                </FormLabel>
                                <Input
                                    type="number"
                                    id="https-port"
                                    disabled={!isEnabled}
                                    className={!isEnabled ? "bg-muted" : ""}
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="Cert"
                        render={({field}) => (
                            <FormItem className="space-y-1">
                                <FormLabel className={!isEnabled ? "text-muted-foreground" : ""}>
                                    Certificate
                                </FormLabel>
                                <Textarea
                                    placeholder="Enter contents of your certificate file"
                                    disabled={!isEnabled}
                                    className={!isEnabled ? "bg-muted" : ""}
                                    {...field}
                                />
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="Key"
                        render={({field}) => (
                            <FormItem className="space-y-1">
                                <FormLabel className={!isEnabled ? "text-muted-foreground" : ""}>
                                    Key
                                </FormLabel>
                                <Textarea
                                    placeholder="Enter contents of your key file"
                                    disabled={!isEnabled}
                                    className={!isEnabled ? "bg-muted" : ""}
                                    {...field}
                                />
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </SettingsCard>
            </form>
        </Form>
    );
}