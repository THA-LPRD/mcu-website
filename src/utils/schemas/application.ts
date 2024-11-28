import {z} from 'zod';

export enum LogLevel {
    Trace = "trace",
    Debug = "debug",
    Info = "info",
    Warn = "warn",
    Error = "error",
    Critical = "critical",
}

export enum DisplayDriver {
    WS_7IN3G = "WS_7IN3G",
    WS_9IN7 = "WS_9IN7",
    GD_7IN5 = "GD_7IN5",
}

export const logSchema = z.object({
    logLevel: z.nativeEnum(LogLevel, {required_error: "Log level is required"})
})
export const DisplayDriverSchema = z.object({
    displayDriver: z.nativeEnum(DisplayDriver, {required_error: "Display driver is required"})
});

export function validateLogLevel(value: string): boolean {
    return logSchema.safeParse({logLevel: value}).success;
}

export function validateDisplayDriver(value: string): boolean {
    return DisplayDriverSchema.safeParse({displayDriver: value}).success;
}

