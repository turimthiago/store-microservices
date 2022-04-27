import { Rabbit } from '../../infra/rabbit/rabbit';
import { env } from '../config';

export const rabbit = new Rabbit(
    `amqp://${env.rabbitMq.user}:${env.rabbitMq.password}@${env.rabbitMq.host}:${env.rabbitMq.port}/`
);
