class DeviceData {
    id: string = '';
    isEmpty: boolean = false;
    deviceType: string = '';
    deviceCapacity: string = '';
    deviceModel: string = '';
    deviceSerial: string = '';
    deviceBrand: string = '';
    deviceRoom: string = '';
    typeOfService: string = '';
    compressorVoltage: string = '';
    compressorAmp: string = '';
    motorCVoltage: string = '';
    motorCAmp: string = '';
    motorEVoltage: string = '';
    motorEAmp: string = '';
    isSerpentinEv: boolean = false;
    isSerpentinCd: boolean = false;
    isFilterCleaning: boolean = false;
    isElectricCircuit: boolean = false;
    isLowPressure: boolean = false;
    isHighPressure: boolean = false;
    notes: string = '';
}

export default DeviceData;