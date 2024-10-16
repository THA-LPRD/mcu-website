import {z} from 'zod';

const booleanStringSchema = z.union([z.literal("true"), z.literal("false")]);

const nonEmptyStringSchema = z.string().min(1, {message: "Value cannot be empty"});

const portSchema = z.string().refine((value) => {
    const port = parseInt(value, 10);
    return !isNaN(port) && port > 0 && port < 65535;
}, {
    message: "Port must be a valid integer between 1 and 65534"
});

export function validateHTTPS(value: string): boolean {
    return booleanStringSchema.safeParse(value).success;
}

export function validateHTTPPort(value: string): boolean {
    return portSchema.safeParse(value).success;
}

export function validateHTTPSPort(value: string): boolean {
    return portSchema.safeParse(value).success;
}

export function validateHTTPAuth(value: string): boolean {
    return booleanStringSchema.safeParse(value).success;
}

export function validateHTTPAuthUser(value: string): boolean {
    return nonEmptyStringSchema.safeParse(value).success;
}

export function validateHTTPAuthPass(value: string): boolean {
    return nonEmptyStringSchema.safeParse(value).success;
}