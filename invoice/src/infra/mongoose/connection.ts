import mongoose from 'mongoose';
import { Logger } from '../../../../libs/store-core';

export class MongooseConnection {
    constructor(private readonly uri: string) {}

    async connect(): Promise<void> {
        mongoose
            .connect(this.uri)
            .then(() => {
                Logger.info('[MongooseConnection] Connected!');
            })
            .catch((err) => {
                Logger.error('[MongooseConnection] trying connection');
                setTimeout(() => this.connect(), 5000);
            });
    }
}
