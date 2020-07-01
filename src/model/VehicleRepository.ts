import IVehicle from '../interface/IVehicle';
import IRepository from '../interface/IRepository';

export default class VehicleRepository<V extends IVehicle> implements IRepository<V> {
  private collection: Map<number, V>;

  public constructor() {
    this.collection = new Map<number, V>();
  }

  public add(vehicle: V): void {
    this.collection.set(vehicle.id, vehicle);
  }

  public getById(id: number): V | undefined {
    return this.collection.get(id);
  }

  public update(vehicle: V): void {
    const datedVehicle = this.getById(vehicle.id);
    if (datedVehicle) {
      datedVehicle.move(vehicle.getPosition());
    }
  }
}
