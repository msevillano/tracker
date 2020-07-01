import Vehicle from './Vehicle';
import calculateDistance from '../utils/calculateDistance';
import IRepository from '../interface/IRepository';

const MIN_DISTANCE_TRIP = ((process.env.MIN_DISTANCE_TRIP as unknown) as number) ?? 60;

export default class VehicleTracker {
  private vehicles: IRepository<Vehicle>;

  public constructor(repository: IRepository<Vehicle>) {
    this.vehicles = repository;
  }

  public update(vehicleList: Vehicle[]): Vehicle[] {
    return vehicleList
      .map((vehicle: Vehicle) => {
        const existingVehicle = this.vehicles.getById(vehicle.id);

        if (existingVehicle) {
          const distance = calculateDistance(vehicle, existingVehicle);
          this.vehicles.update(vehicle);

          if (distance > MIN_DISTANCE_TRIP) {
            return vehicle;
          }
        } else {
          this.vehicles.add(vehicle);
        }
        return new Vehicle({ id: -1, lat: 0, lng: 0 });
      })
      .filter((vehicle) => vehicle.id != -1);
  }
}
