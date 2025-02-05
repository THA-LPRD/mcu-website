import React from 'react';
import SettingsLayout from '@/components/layouts/SettingsLayout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsCard } from "@/components/SettingsCard";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Toaster } from "@/components/ui/toaster";
import { useDeviceConfigForm } from '@/hooks/useDeviceConfig';
import { SkeletonLoader } from '@/components/settings/device-config/SkeletonLoader';
import { Mode } from '@/types/deviceConfig';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
type AuthModeFieldName = `${Lowercase<Mode>}WiFiAuth_Mode`;
type PasswordFieldName = `${Lowercase<Mode>}WiFiPassword`;
type EAPIDFieldName = `${Lowercase<Mode>}WiFiEAP_ID`;
type EAPUsernameFieldName = `${Lowercase<Mode>}WiFiEAP_Username`;
type EAPCertFieldName = `${Lowercase<Mode>}WiFiEAP_Cert`;

interface FieldNames {
    ssid: SSIDFieldName;
    password: PasswordFieldName;
    auth_mode?: AuthModeFieldName;
    eap_id?: EAPIDFieldName;
    eap_username?: EAPUsernameFieldName;
    eap_cert?: EAPCertFieldName;
}

const getFieldNames = (mode: Mode): FieldNames => {
    const prefix = mode.toLowerCase();
    return {
        ssid: `${prefix}WiFiSSID` as SSIDFieldName,
        password: `${prefix}WiFiPassword` as PasswordFieldName,
        auth_mode: `${prefix}WiFiAuth_Mode` as AuthModeFieldName,
        eap_id: `${prefix}WiFiEAP_ID` as EAPIDFieldName,
        eap_username: `${prefix}WiFiEAP_Username` as EAPUsernameFieldName,
        eap_cert: `${prefix}WiFiEAP_Cert` as EAPCertFieldName,
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
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            This configuration is read-only because {mode} is not the currently selected mode.
                            To edit these settings, select {mode} in the Operating Mode dropdown above.
                        </AlertDescription>
                    </Alert>
                )}
                <div className="space-y-4 mb-4">

                </div>
                <div className="space-y-4 mb-4">
                    <FormField
                        control={form.control}
                        name={fieldNames.ssid}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>WiFi SSID</FormLabel>
                                <Input
                                    {...field}
                                    disabled={!isCurrentMode}
                                    placeholder="Enter WiFi network name"
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                {(mode === Mode.Server || mode === Mode.Network) && (<Card className='mb-4'>
                    <CardContent>
                    <FormField
                        control={form.control}
                        name={fieldNames.auth_mode}
                        render={({ field }) => (
                        <FormControl>
                                
                        <Tabs defaultValue={field.value} onValueChange={field.onChange} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mt-4">
                                <TabsTrigger key='PSK' value='PSK'>
                                    PSK
                                </TabsTrigger>
                                <TabsTrigger key='EAP' value='EAP'>
                                    EAP
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent key='PSK' value='PSK'>
                                <FormField
                                    control={form.control}
                                    name={fieldNames.password}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>WiFi Password</FormLabel>
                                            <Input
                                                {...field}
                                                type="password"
                                                disabled={!isCurrentMode}
                                                placeholder="Enter WiFi password"
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>
                            <TabsContent key='EAP' value='EAP'>
                                <FormField
                                    control={form.control}
                                    name={fieldNames.eap_id}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Anonymous identity</FormLabel>
                                            <Input
                                                {...field}
                                                type="text"
                                                disabled={!isCurrentMode}
                                                placeholder="Enter anonymous identity"
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={fieldNames.eap_username}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>User name</FormLabel>
                                            <Input
                                                {...field}
                                                type="text"
                                                disabled={!isCurrentMode}
                                                placeholder="Enter user name"
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={fieldNames.password}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>User Password</FormLabel>
                                            <Input
                                                {...field}
                                                type="password"
                                                disabled={!isCurrentMode}
                                                placeholder="Enter user password"
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={fieldNames.eap_cert}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>EAP Cert</FormLabel>
                                            <Textarea
                                                placeholder="Enter contents of your certificate file"
                                                disabled={!isCurrentMode}
                                                className={!isCurrentMode ? "bg-muted" : ""}
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>
                        </Tabs>
                    
                
                </FormControl>
            )}
            />
            </CardContent>
            </Card>
                    )}

                {mode === Mode.Standalone && (<FormField
                    control={form.control}
                    name={fieldNames.password}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>WiFi Password</FormLabel>
                            <Input
                                {...field}
                                type="password"
                                disabled={!isCurrentMode}
                                placeholder="Enter WiFi password"
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />)}

                {mode === Mode.Server && (
                    <FormField
                        control={form.control}
                        name="serverURL"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Server URL</FormLabel>
                                <Input
                                    {...field}
                                    disabled={!isCurrentMode}
                                    placeholder="Enter server URL"
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

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

    // if (isLoading) return <SettingsLayout><SkeletonLoader/></SettingsLayout>;
    // if (fetchError) return <div>Error loading device config</div>;

    return (
        <SettingsLayout>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <Toaster />
                    <SettingsCard
                        isMutating={isMutating}
                        title="Device Configuration"
                        description="Configure the device operating mode and network settings."
                    >
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="Mode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Operating Mode</FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-[200px]">
                                                <SelectValue placeholder="Select mode" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(Mode).map((mode) => (
                                                    <SelectItem key={mode} value={mode}>
                                                        {mode}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
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
