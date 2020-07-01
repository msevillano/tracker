import Mongoose from 'mongoose';

export default async function mongoConnection(dbInfo: DbProps): Promise<void> {
  Mongoose.set('useCreateIndex', true);
  await Mongoose.connect(dbInfo.connectionUri, dbInfo.options);
}

export interface DbProps {
  connectionUri: string;
  options?: { [k: string]: boolean };
}
