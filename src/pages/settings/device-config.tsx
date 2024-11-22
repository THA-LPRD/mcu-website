import React from 'react';
import SettingsLayout from '@/components/layouts/SettingsLayout';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {SettingsCard} from "@/components/SettingsCard";
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Toaster} from "@/components/ui/toaster";
import {useDeviceConfigForm} from '@/hooks/useDeviceConfig';
import {SkeletonLoader} from '@/components/settings/device-config/SkeletonLoader';
import {Mode} from '@/types/deviceConfig';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {AlertCircle} from "lucide-react";
import {Alert, AlertDescription} from "@/components/ui/alert";

const getModeDescription = (mode: Mode) => {
    switch (mode) {
        case Mode.Standalone:
            return "Device operates independently without external connections. Only requires local WiFi for basic connectivity.";
        case Mode.Network:
            return "Device connects to a local network for enhanced functionality. Requires secure WiFi credentials.";
        case Mode.Server:
            return "Device connects to a central server for remote management and data synchronization. Requires both WiFi and server configuration.";
        default:
            return "";
    }
};

type SSIDFieldName = `${Lowercase<Mode>}WiFiSSID`;
type PasswordFieldName = `${Lowercase<Mode>}WiFiPassword`;

interface FieldNames {
    ssid: SSIDFieldName;
    password: PasswordFieldName;
}

const getFieldNames = (mode: Mode): FieldNames => {
    const prefix = mode.toLowerCase();
    return {
        ssid: `${prefix}WiFiSSID` as SSIDFieldName,
        password: `${prefix}WiFiPassword` as PasswordFieldName
    };
};

const ModeContent = ({
                         mode,
                         selectedMode,
                         form
                     }: {
    mode: Mode;
    selectedMode: Mode | undefined;
    form: ReturnType<typeof useDeviceConfigForm>['form'];
}) => {
    const isCurrentMode = mode === selectedMode;
    const fieldNames = getFieldNames(mode);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{mode}</CardTitle>
                <CardDescription>{getModeDescription(mode)}</CardDescription>
            </CardHeader>
            <CardContent>
                {!isCurrentMode && (
                    <Alert className="mb-4">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertDescription>
                            This configuration is read-only because {mode} is not the currently selected mode.
                            To edit these settings, select {mode} in the Operating Mode dropdown above.
                        </AlertDescription>
                    </Alert>
                )}

                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name={fieldNames.ssid}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>WiFi SSID</FormLabel>
                                <Input
                                    {...field}
                                    disabled={!isCurrentMode}
                                    placeholder="Enter WiFi network name"
                                />
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={fieldNames.password}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>WiFi Password</FormLabel>
                                <Input
                                    {...field}
                                    type="password"
                                    disabled={!isCurrentMode}
                                    placeholder="Enter WiFi password"
                                />
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {mode === Mode.Server && (
                        <FormField
                            control={form.control}
                            name="serverURL"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Server URL</FormLabel>
                                    <Input
                                        {...field}
                                        disabled={!isCurrentMode}
                                        placeholder="Enter server URL"
                                    />
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default function DeviceConfigPage() {
    const {
        form,
        onSubmit,
        isMutating,
        isLoading,
        fetchError
    } = useDeviceConfigForm();

    const selectedMode = form.watch("Mode");
    const [activeTab, setActiveTab] = React.useState<string>(Mode.Standalone);

    React.useEffect(() => {
        if (selectedMode) {
            setActiveTab(selectedMode);
        }
    }, [selectedMode]);

    if (isLoading) return <SettingsLayout><SkeletonLoader/></SettingsLayout>;
    if (fetchError) return <div>Error loading device config</div>;

    return (
        <SettingsLayout>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <Toaster/>
                    <SettingsCard
                        isMutating={isMutating}
                        title="Device Configuration"
                        description="Configure the device operating mode and network settings."
                    >
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="Mode"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Operating Mode</FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-[200px]">
                                                <SelectValue placeholder="Select mode"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(Mode).map((mode) => (
                                                    <SelectItem key={mode} value={mode}>
                                                        {mode}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    {Object.values(Mode).map((mode) => (
                                        <TabsTrigger key={mode} value={mode}>
                                            {mode}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                {Object.values(Mode).map((mode) => (
                                    <TabsContent key={mode} value={mode}>
                                        <ModeContent
                                            mode={mode}
                                            selectedMode={selectedMode}
                                            form={form}
                                        />
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </div>
                    </SettingsCard>
                </form>
            </Form>
        </SettingsLayout>
    );
}
