/* eslint-disable @typescript-eslint/no-unused-vars */
import useSWR, { SWRConfiguration } from 'swr';
import useSWRMutation from 'swr/mutation';
import {
    validateOperatingMode,
    validateLogLevel,
    validateDisplayDriver,
    Mode,
    LogLevel,
    DisplayDriver,
    AppStandaloneConfig,
    AppNetworkConfig,
    AppServerConfig
} from '@/utils/schemas/application';
import {
    validateHTTPPort,
    validateHTTPSPort,
    validateHTTPS,
} from '@/utils/schemas/http-server'

const API_BASE_URL = "/api/v2"

export async function fetcher(url: string): Promise<string> {
    return fetch(url).then(res => res.text());
}

export async function setter(url: string, { arg }: { arg: Record<string, string> }) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(arg),
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.text();
}

function useApiData<T extends string | number | boolean>(
    url: string,
    validate: (data: T) => boolean,
    onSuccess?: (data: T) => void,
    onError?: (error: unknown) => void,
    config?: SWRConfiguration<T>
) {
    const { data, error } = useSWR<T>(url, fetcher as (url: string) => Promise<T>, {
        onSuccess: (fetchedData: T) => {
            if (validate(fetchedData)) {
                onSuccess?.(fetchedData);
            } else {
                const validationError = new Error(`Validation failed for ${url}`);
                console.error(validationError);
                onError?.(validationError);
            }
        },
        onError: (err: unknown) => {
            console.error(`Failed to fetch from ${url}:`, err);
            onError?.(err);
        },
        ...config,
    });

    return { data, error, isLoading: !data && !error };
}

export const ApiService = {
    useOperatingMode: (onSuccess?: (data: string) => void, onError?: (error: unknown) => void) =>
        useApiData<string>('${API_BASE_URL}/getOpMode', validateOperatingMode, onSuccess, onError),

    useLogLevel: (onSuccess?: (data: string) => void, onError?: (error: unknown) => void) =>
        useApiData<string>('${API_BASE_URL}/getLogLevel', validateLogLevel, onSuccess, onError),

    useDisplayDriver: (onSuccess?: (data: string) => void, onError?: (error: unknown) => void) =>
        useApiData<string>('${API_BASE_URL}1/getDisplayDriver', validateDisplayDriver, onSuccess, onError),

    useHttpsPort: (onSuccess?: (data: string) => void, onError?: (error: unknown) => void) =>
        useApiData<string>('${API_BASE_URL}1/getHttpsPort', validateHTTPSPort, onSuccess, onError),

    useHttpPort: (onSuccess?: (data: string) => void, onError?: (error: unknown) => void) =>
        useApiData<string>('${API_BASE_URL}/getHttpPort', validateHTTPPort, onSuccess, onError),

    useHttpsStatus: (onSuccess?: (data: string) => void, onError?: (error: unknown) => void) =>
        useApiData<string>('${API_BASE_URL}/getHttps', validateHTTPS, onSuccess, onError),

    useSetOpMode: () => {
        return useSWRMutation('${API_BASE_URL}/setOpMode', setter);
    },

    useSetLogLevel: () => {
        return useSWRMutation('${API_BASE_URL}/setLogLevel', setter);
    },
};
/* eslint-enable @typescript-eslint/no-unused-vars */
