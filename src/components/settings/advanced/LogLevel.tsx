import React from 'react';
import {SettingsCard} from "@/components/SettingsCard";
import {Form, FormField} from "@/components/ui/form";
import {Toaster} from "@/components/ui/toaster";
import {useLogLevelForm} from "@/hooks/useLogLevel";
import {SkeletonLoaderLog} from "./SkeletonLoader";
import {EnumSelect} from "@/components/EnumSelect";
import {LogLevel} from "@/utils/schemas/application";

export function LogLevelSettings() {
    const {form, onSubmit, isMutating, isLoading, fetchError} = useLogLevelForm();

    if (isLoading) return <SkeletonLoaderLog/>;
    if (fetchError) return <div>Error loading log level</div>;

    return (
        <Form {...form}>
            <Toaster/>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <SettingsCard isMutating={isMutating} title={"Log Level"} description={"Set the Log Level."}>
                    <FormField
                        control={form.control}
                        name="logLevel"
                        render={({field}) => (
                            <EnumSelect
                                field={field}
                                label="Log Level"
                                enumObj={LogLevel}
                            />
                        )}
                    />
                </SettingsCard>
            </form>
        </Form>
    );
}
