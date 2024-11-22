export interface DisplayInfo {
    Width: number;
    Height: number;
    ColorDepth: number;
    PartialRefresh: boolean;
    DriverName: string;
}

export interface DeviceInfo {
    DeviceID: string;
    OperatingMode: string;
    IP: string;
    LogLevel: string;
    Display: DisplayInfo;
}