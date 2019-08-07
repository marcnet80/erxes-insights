import * as amqplib from 'amqplib';
import * as dotenv from 'dotenv';
import { debugBase } from './debuggers';

dotenv.config();

const { RABBITMQ_HOST = 'amqp://localhost' } = process.env;

let conn;
let channel;

export const initConsumer = async () => {
  try {
    conn = await amqplib.connect(RABBITMQ_HOST);
    channel = await conn.createChannel();

    // listen for erxes api ===========
    await channel.assertQueue('erxes-api:sync-conversations');

    channel.consume('erxes-api:sync-conversations', async msg => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());

        debugBase(data);

        channel.ack(msg);
      }
    });
  } catch (e) {
    debugBase(e.message);
  }
};