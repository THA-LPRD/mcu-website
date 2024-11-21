export interface HttpsResponse {
    Enabled: boolean;
    Port: number;
    HasCert: boolean;
    HasKey: boolean;
}

export interface HttpsUpdateRequest {
    Enabled: boolean;
    Port?: number;
    Cert?: string;
    Key?: string;
}