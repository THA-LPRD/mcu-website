import {z} from 'zod';

export enum Mode {
    Standalone = "Standalone",
    Network = "Network",
    Server = "Server",
}

export enum LogLevel {
    Trace = "Trace",
    Debug = "Debug",
    Info = "Info",
    Warn = "Warn",
    Error = "Error",
    Critical = "Critical",
}

export enum DisplayDriver {
    WS_7IN3G = "WS_7IN3G",
    WS_9IN7 = "WS_9IN7",
}

export enum AppStandaloneConfig {
    WiFiSSID = "WiFiSSID",
    WiFiPassword = "WiFiPassword",
}

export enum AppNetworkConfig {
    WiFiSSID = "WiFiSSID",
    WiFiPassword = "WiFiPassword",
}

export enum AppServerConfig {
    WiFiSSID = "WiFiSSID",
    WiFiPassword = "WiFiPassword",
    ServerURL = "ServerURL",
}

const modeSchema = z.nativeEnum(Mode);
export const logSchema = z.object({
    logLevel: z.nativeEnum(LogLevel, {required_error: "Log level is required"})
})
const DisplayDriverSchema = z.nativeEnum(DisplayDriver);
const nonEmptyStringSchema = z.string().min(1, {message: "Value cannot be empty"});
const passwordSchema = z.string().min(8, {message: "Password must be longer than 8 characters"});
const urlSchema = z.string().url({message: "Invalid URL format"});

export function validateOperatingMode(value: string): boolean {
    return modeSchema.safeParse(value).success;
}

export function validateLogLevel(value: string): boolean {
    return logSchema.safeParse({logLevel: value}).success;
}

export function validateDisplayDriver(value: string): boolean {
    return DisplayDriverSchema.safeParse(value).success;
}

export function validateStandaloneWiFiSSID(value: string): boolean {
    return nonEmptyStringSchema.safeParse(value).success;
}

export function validateStandaloneWiFiPassword(value: string): boolean {
    return nonEmptyStringSchema.safeParse(value).success;
}

export function validateNetworkWiFiSSID(value: string): boolean {
    return nonEmptyStringSchema.safeParse(value).success;
}

export function validateNetworkWiFiPassword(value: string): boolean {
    return passwordSchema.safeParse(value).success;
}

export function validateServerWiFiSSID(value: string): boolean {
    return nonEmptyStringSchema.safeParse(value).success;
}

export function validateServerWiFiPassword(value: string): boolean {
    return passwordSchema.safeParse(value).success;
}

export function validateServerURL(value: string): boolean {
    return urlSchema.safeParse(value).success;
}
