export default interface IRepository<T> {
  add: (element: T) => void;
  getById: (id: number) => T | undefined;
  update: (element: T) => void;
}
