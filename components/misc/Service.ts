import DeviceData from "./DeviceData";

class Service {
    serviceID: number = 0;
    clientName: string = '';
    clientTel: string = '';
    clientLocation: string = '';
    date_day: number = 0;
    date_month: number = 0;
    date_year: number = 0;
    deviceData: DeviceData[] = [];
}

export default Service;