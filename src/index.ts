import dotEnv from 'dotenv';
dotEnv.config();

import Vehicle from './model/Vehicle';
import VehicleRepository from './model/VehicleRepository';
import VehicleTracker from './model/VehicleTracker';
import DataProvider from './services/DataProvider';
import mongoConnection from './database/mongoConnection';
import Trip from './database/models/Trip';

const SLEEP_TIME = (process.env.SLEEP_TIME as unknown) as number;
const MONGO_URI = process.env.MONGO_URI as string;
const DATA_PROVIDER = process.env.DATA_PROVIDER as string;
const DATA_PROVIDER_ACCESS_TOKEN = 'Bearer ' + (process.env.DATA_PROVIDER_ACCESS_TOKEN as string);

const vehicleRepository = new VehicleRepository<Vehicle>();
const vehicleTracker = new VehicleTracker(vehicleRepository);
const dataProvider = new DataProvider(DATA_PROVIDER, DATA_PROVIDER_ACCESS_TOKEN);

void mongoConnection({
  connectionUri: MONGO_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
}).then(() => {
  setInterval(run, SLEEP_TIME);
});

async function run(): Promise<void> {
  console.log('new cycle');
  const vehicles = await dataProvider.getData();
  const vehiclesThatMadeTrips = vehicleTracker.update(vehicles);
  const trips = vehiclesThatMadeTrips.map((vehicle) => {
    return new Trip({ vehicleId: vehicle.id, tripDate: new Date() });
  });
  await Trip.insertMany(trips);
}
