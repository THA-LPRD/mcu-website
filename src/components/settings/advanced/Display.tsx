import React from 'react';
import {SettingsCard} from '@/components/SettingsCard';
import {Form, FormField} from '@/components/ui/form';
import {Toaster} from '@/components/ui/toaster';
import {useDisplayDriverForm} from '@/hooks/useDisplayDriver';
import {SkeletonLoaderDisplay} from './SkeletonLoader';
import {EnumSelect} from '@/components/EnumSelect';
import {DisplayDriver} from '@/utils/schemas/application';

export function DisplaySettings() {
    const {form, onSubmit, isMutating, isLoading, fetchError} = useDisplayDriverForm();

    if (isLoading) return <SkeletonLoaderDisplay/>;
    if (fetchError) return <div>Error loading Display Driver</div>;

    return (
        <Form {...form}>
            <Toaster/>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <SettingsCard isMutating={isMutating} title="Display Driver" description="Set the Display Driver.">
                    <FormField
                        control={form.control}
                        name="displayDriver"
                        render={({field}) => (
                            <EnumSelect
                                field={field}
                                label="Display Driver"
                                enumObj={DisplayDriver}
                            />
                        )}
                    />
                </SettingsCard>
            </form>
        </Form>
    );
}
