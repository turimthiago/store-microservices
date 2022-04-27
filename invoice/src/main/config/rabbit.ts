import { Rabbit } from '../../infra/rabbit/rabbit';

export const rabbit = new Rabbit('amqp://admin:admin@rabbitmq:5672/');
