import Vehicle from '../src/model/Vehicle';
import VehicleRepository from '../src/model/VehicleRepository';
import VehicleTracker from '../src/model/VehicleTracker';

describe('Tracking vehicle rides', () => {
  test('3 vehicles that dont move, should not compute as any trip', () => {
    const v1_1 = new Vehicle({ id: 1, lat: 0, lng: 0 });
    const v2_1 = new Vehicle({ id: 3, lat: 0, lng: 0 });
    const v3_1 = new Vehicle({ id: 7, lat: 0, lng: 0 });

    const vehicleRepository = new VehicleRepository<Vehicle>();
    const vehicleTracker = new VehicleTracker(vehicleRepository);

    vehicleTracker.update([v1_1, v2_1, v3_1]);

    const result = vehicleTracker.update([v1_1, v2_1, v3_1]);

    expect(result.length).toBe(0);
  });

  test('3 vehicles, 1 moves more than required distance. should compute 1 trip for the moved vehicle', () => {
    const v1_1 = new Vehicle({ id: 1, lat: 41.408455, lng: 2.171135 });
    const v2_1 = new Vehicle({ id: 3, lat: 0, lng: 0 });
    const v3_1 = new Vehicle({ id: 7, lat: 0, lng: 0 });

    const vehicleRepository = new VehicleRepository<Vehicle>();
    const vehicleTracker = new VehicleTracker(vehicleRepository);

    vehicleTracker.update([v1_1, v2_1, v3_1]);

    const v1_2 = new Vehicle({ id: 1, lat: 41.408455, lng: 2.170415 });

    const result = vehicleTracker.update([v2_1, v1_2]);

    expect(result.length).toBe(1);
    expect(result[0]?.id).toBe(1);
    expect(vehicleRepository.getById(1)?.lat).toBe(41.408455);
    expect(vehicleRepository.getById(1)?.lng).toBe(2.170415);
  });

  test('3 vehicles, 1 added after initial load. should not compute as any trip', () => {
    const v1_1 = new Vehicle({ id: 1, lat: 41.408455, lng: 2.171135 });
    const v2_1 = new Vehicle({ id: 3, lat: 0, lng: 0 });
    const v3_1 = new Vehicle({ id: 7, lat: 0, lng: 0 });

    const vehicleRepository = new VehicleRepository<Vehicle>();
    const vehicleTracker = new VehicleTracker(vehicleRepository);

    vehicleTracker.update([v1_1, v2_1, v3_1]);

    const v4_1 = new Vehicle({ id: 5, lat: 41.408455, lng: 2.170415 });

    const result = vehicleTracker.update([v4_1]);

    expect(result.length).toBe(0);
  });
});
