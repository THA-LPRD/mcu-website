export enum Mode {
    Standalone = "Standalone",
    Network = "Network",
    Server = "Server",
}

export interface StandaloneConfigRequest {
    Mode: Mode.Standalone;
    WiFiSSID: string;
    WiFiPassword: string;
}

export interface NetworkConfigRequest {
    Mode: Mode.Network;
    WiFiSSID: string;
    WiFiPassword: string;
}

export interface ServerConfigRequest {
    Mode: Mode.Server;
    WiFiSSID: string;
    WiFiPassword: string;
    serverURL: string;
}

export type DeviceConfigRequest = StandaloneConfigRequest | NetworkConfigRequest | ServerConfigRequest;
