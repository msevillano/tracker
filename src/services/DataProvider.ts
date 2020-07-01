import fetch, { RequestInfo } from 'node-fetch';
import Vehicle from '../model/Vehicle';
import Vehicledata from '../interface/VehicleData';

export default class DataProvider {
  private _serviceUrl: string;
  private _token: string;

  constructor(serviceUrl: string, token: string) {
    this._serviceUrl = serviceUrl;
    this._token = token;
  }

  async getData(): Promise<Vehicle[]> {
    const urlResponse = await fetch(this._serviceUrl as RequestInfo, {
      method: 'GET',
      headers: { Authorization: this._token }
    });
    const data = await urlResponse.json();
    return data.map((vehicleData: Vehicledata) => {
      return new Vehicle(vehicleData);
    });
  }
}
