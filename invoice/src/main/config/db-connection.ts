import mongoose from 'mongoose';
import { MongooseConnection } from '../../infra/mongoose/connection';

export const mongooseConnection = new MongooseConnection(
    'mongodb://root:example@mongo:27017/invoice'
);
