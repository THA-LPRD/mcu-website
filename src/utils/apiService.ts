import useSWR, {SWRConfiguration} from 'swr';
import useSWRMutation from 'swr/mutation';
import {
    validateLogLevel,
    validateDisplayDriver,
} from '@/utils/schemas/application';
import {
    validateHTTPPort,
} from '@/utils/schemas/http-server'
import {Mode} from '@/types/deviceConfig'
import type {DeviceInfo} from '@/types/deviceInfo';
import type {DeviceConfigRequest} from "@/types/deviceConfig";
import type {HttpsResponse, HttpsUpdateRequest} from '@/types/https';

const API_BASE_URL = "/api/v2"

export async function fetcherText(url: string): Promise<string> {
    return fetch(url).then(res => res.text());
}

export async function fetcherJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
}

export async function setterText(url: string, {arg}: { arg: Record<string, string> }) {
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

export async function setterJson<TResponse, TRequest>(url: string, {arg}: { arg: TRequest }): Promise<TResponse> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.headers.get('Content-Type')?.includes('application/json')
        ? response.json()
        : await response.text() as unknown as Promise<TResponse>;
}

function useApiData<T extends string | number | boolean | DeviceInfo | HttpsResponse>(
    url: string,
    validate: (data: T) => boolean,
    onSuccess?: (data: T) => void,
    onError?: (error: unknown) => void,
    fetcher?: (url: string) => Promise<T>,
    config?: SWRConfiguration<T>
) {
    const {data, error} = useSWR<T>(url, fetcher || fetcherText as (url: string) => Promise<T>, {
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

    return {data, error, isLoading: !data && !error};
}

export const ApiService = {
    useDeviceInfo: (onSuccess?: (data: DeviceInfo) => void, onError?: (error: unknown) => void) =>
        useApiData<DeviceInfo>(
            `${API_BASE_URL}/DeviceInfo`,
            (data): data is DeviceInfo => {
                return typeof data === 'object' && data !== null &&
                    'DeviceID' in data &&
                    'OperatingMode' in data &&
                    'IP' in data &&
                    'LogLevel' in data &&
                    'Display' in data;
            },
            onSuccess,
            onError,
            fetcherJson
        ),

    useDeviceConfig: (onSuccess?: (data: string) => void, onError?: (error: unknown) => void) =>
        useApiData<string>(
            `${API_BASE_URL}/DeviceConfig`,
            (data) => Object.values(Mode).includes(data as Mode),
            onSuccess,
            onError,
            fetcherText
        ),

    useLogLevel: (onSuccess?: (data: string) => void, onError?: (error: unknown) => void) =>
        useApiData<string>(`${API_BASE_URL}/getLogLevel`, validateLogLevel, onSuccess, onError, fetcherText),

    useDisplayDriver: (onSuccess?: (data: string) => void, onError?: (error: unknown) => void) =>
        useApiData<string>(`${API_BASE_URL}/getDisplayDriver`, validateDisplayDriver, onSuccess, onError, fetcherText),

    useHttpPort: (onSuccess?: (data: string) => void, onError?: (error: unknown) => void) =>
        useApiData<string>(`${API_BASE_URL}/getHttp`, validateHTTPPort, onSuccess, onError),

    useHttpsStatus: (onSuccess?: (data: HttpsResponse) => void, onError?: (error: unknown) => void) =>
        useApiData<HttpsResponse>(
            `${API_BASE_URL}/Https`,
            () => true,
            onSuccess,
            onError,
            fetcherJson
        ),

    useRestart: () => {
        return useSWRMutation<string, Error, string, void>(
            `${API_BASE_URL}/Restart`,
            setterJson
        );
    },

    useSetDeviceConfig: () => {
        return useSWRMutation<string, Error, string, DeviceConfigRequest>(
            `${API_BASE_URL}/DeviceConfig`,
            setterJson
        );
    },

    useSetLogLevel: () => {
        return useSWRMutation(`${API_BASE_URL}/setLogLevel`, setterText);
    },

    useSetDisplayDriver: () => {
        return useSWRMutation(`${API_BASE_URL}/setDisplayDriver`, setterText);
    },

    useSetAuthUser: () => {
        return useSWRMutation(`${API_BASE_URL}/setHttpAuthUser`, setterText);
    },

    useSetAuthPass: () => {
        return useSWRMutation(`${API_BASE_URL}/setHttpAuthPass`, setterText);
    },

    useSetHttpPort: () => {
        return useSWRMutation(`${API_BASE_URL}/setHttp`, setterText);
    },

    useSetHttps: () => {
        return useSWRMutation<HttpsResponse, Error, string, HttpsUpdateRequest>(
            `${API_BASE_URL}/Https`,
            setterJson
        )
    }
};
