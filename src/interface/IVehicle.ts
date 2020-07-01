import IPosition from './IPosition';

export default interface IVehicle {
  id: number;
  getPosition: () => IPosition;
  move: (position: IPosition) => void;
}
