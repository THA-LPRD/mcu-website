export enum Mode {
    Standalone = "Standalone",
    Network = "Network",
    Server = "Server",
}
/*
export enum Auth_Mode {
    PSK = "PSK",
    EAP = "EAP",
}
*/
export interface StandaloneConfigRequest {
    Mode: Mode.Standalone;
    WiFiSSID: string;
    WiFiPassword: string;
}

export interface NetworkConfigRequest {
    Mode: Mode.Network;
    WiFiSSID: string;
    // WiFiAuth_Mode: string;
    // WiFiEAPID: string;
    // WiFiEAPUsername: string;
    // WiFiEAPCert: string;
    WiFiPassword: string;
}

export interface ServerConfigRequest {
    Mode: Mode.Server;
    WiFiSSID: string;
    // WiFiAuth_Mode: string;
    WiFiPassword: string;
    // WiFiEAPID: string;
    // WiFiEAPUsername: string;
    // WiFiEAPCert: string;
    ServerURL: string;
}

export type DeviceConfigRequest = StandaloneConfigRequest | NetworkConfigRequest | ServerConfigRequest;
