import IVehicle from '../interface/IVehicle';
import VehicleData from '../interface/VehicleData';
import IPosition from 'interface/IPosition';

export default class Vehicle implements IVehicle, IPosition {
  private _id: number;
  private _lat: number;
  private _lng: number;

  public constructor(data: VehicleData) {
    this._id = data.id;
    this._lat = data.lat;
    this._lng = data.lng;
  }
  public get id(): number {
    return this._id;
  }
  public get lat(): number {
    return this._lat;
  }
  public get lng(): number {
    return this._lng;
  }

  public getPosition(): IPosition {
    return { lat: this.lat, lng: this.lng };
  }

  public move(position: IPosition): void {
    this._lat = position.lat;
    this._lng = position.lng;
  }
}
