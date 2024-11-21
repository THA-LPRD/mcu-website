import React from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "@/hooks/use-toast";
import {ApiService} from "@/utils/apiService";
import {Mode} from "@/types/deviceConfig";
import type {
    DeviceConfigRequest,
    StandaloneConfigRequest,
    NetworkConfigRequest,
    ServerConfigRequest
} from "@/types/deviceConfig";

export type DeviceConfigFormData = z.infer<typeof deviceConfigSchema>;
const nonEmptyStringSchema = z.string().min(1, {message: "Value cannot be empty"});
const passwordSchema = z.string().min(8, {message: "Password must be longer than 8 characters"});
const urlSchema = z.string().url({message: "Invalid URL format"});
const deviceConfigSchema = z.discriminatedUnion("Mode", [
    z.object({
        Mode: z.literal(Mode.Standalone),
        standaloneWiFiSSID: nonEmptyStringSchema,
        standaloneWiFiPassword: nonEmptyStringSchema,
    }),
    z.object({
        Mode: z.literal(Mode.Network),
        networkWiFiSSID: nonEmptyStringSchema,
        networkWiFiPassword: passwordSchema,
    }),
    z.object({
        Mode: z.literal(Mode.Server),
        serverWiFiSSID: nonEmptyStringSchema,
        serverWiFiPassword: passwordSchema,
        serverURL: urlSchema,
    })
]);

export function useDeviceConfigForm() {
    const [loadError, setLoadError] = React.useState<Error | null>(null);
    const [isEditing, setIsEditing] = React.useState(false);
    const [initialLoad, setInitialLoad] = React.useState(true);
    const {toast} = useToast();

    const form = useForm<DeviceConfigFormData>({
        resolver: zodResolver(deviceConfigSchema),
        defaultValues: {
            Mode: undefined,
            standaloneWiFiSSID: '',
            standaloneWiFiPassword: '',
            networkWiFiSSID: '',
            networkWiFiPassword: '',
            serverWiFiSSID: '',
            serverWiFiPassword: '',
            serverURL: ''
        }
    });

    React.useEffect(() => {
        const subscription = form.watch(() => {
            if (!isEditing && !initialLoad) {
                setIsEditing(true);
            }
        });

        return () => subscription.unsubscribe();
    }, [form, isEditing, initialLoad]);

    React.useEffect(() => {
        const subscription = form.watch((value, {name}) => {
            if (name === 'Mode') {
                const mode = value.Mode;
                try {
                    if (mode === Mode.Standalone) {
                        form.setValue('networkWiFiSSID', '');
                        form.setValue('networkWiFiPassword', '');
                        form.setValue('serverWiFiSSID', '');
                        form.setValue('serverWiFiPassword', '');
                        form.setValue('serverURL', '');
                    } else if (mode === Mode.Network) {
                        form.setValue('standaloneWiFiSSID', '');
                        form.setValue('standaloneWiFiPassword', '');
                        form.setValue('serverWiFiSSID', '');
                        form.setValue('serverWiFiPassword', '');
                        form.setValue('serverURL', '');
                    } else if (mode === Mode.Server) {
                        form.setValue('standaloneWiFiSSID', '');
                        form.setValue('standaloneWiFiPassword', '');
                        form.setValue('networkWiFiSSID', '');
                        form.setValue('networkWiFiPassword', '');
                    }
                } catch (error) {
                    console.error("Error setting form values:", error);
                    setLoadError(error instanceof Error ? error : new Error("Failed to set form values"));
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Failed to update form values",
                    });
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [form, toast]);

    const {trigger: setDeviceConfig, isMutating, error: mutationError} = ApiService.useSetDeviceConfig();

    const {error: apiError, isLoading} = ApiService.useDeviceConfig(
        (mode: string) => {
            try {
                if (!Object.values(Mode).includes(mode as Mode)) {
                    throw new Error(`Invalid mode received: ${mode}`);
                }
                if (!isEditing || initialLoad) {
                    form.setValue("Mode", mode as Mode);
                    setInitialLoad(false);
                }
            } catch (error) {
                console.error("Failed to set mode:", error);
                setLoadError(error instanceof Error ? error : new Error("Failed to set mode"));
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to load device configuration",
                });
            }
        },
        (err) => {
            console.error("Failed to load device config:", err);
            setLoadError(err instanceof Error ? err : new Error("Failed to load configuration"));
        }
    );

    const fetchError = loadError || apiError;

    async function onSubmit(data: DeviceConfigFormData) {
        try {
            let updateRequest: DeviceConfigRequest;
            switch (data.Mode) {
                case Mode.Standalone:
                    updateRequest = {
                        Mode: Mode.Standalone,
                        WiFiSSID: data.standaloneWiFiSSID,
                        WiFiPassword: data.standaloneWiFiPassword
                    } as StandaloneConfigRequest;
                    break;
                case Mode.Network:
                    updateRequest = {
                        Mode: Mode.Network,
                        WiFiSSID: data.networkWiFiSSID,
                        WiFiPassword: data.networkWiFiPassword
                    } as NetworkConfigRequest;
                    break;
                case Mode.Server:
                    updateRequest = {
                        Mode: Mode.Server,
                        WiFiSSID: data.serverWiFiSSID,
                        WiFiPassword: data.serverWiFiPassword,
                        serverURL: data.serverURL
                    } as ServerConfigRequest;
                    break;
                default:
                    throw new Error("Invalid mode");
            }
            await setDeviceConfig(updateRequest);
            setIsEditing(false);
            toast({
                variant: "default",
                title: "Success",
                description: "Device configuration updated successfully.",
            });
        } catch (error) {
            console.error("Failed to update device config: ", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: mutationError ? mutationError.message : "There was a problem updating the device configuration.",
            });
        }
    }

    return {
        form,
        onSubmit,
        isMutating,
        isLoading,
        fetchError,
        isEditing
    };
}
