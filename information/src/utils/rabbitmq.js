const amqp = require('amqplib')
const serviceRepo = require('../repositories/servicesRepo');
require('dotenv').config();

let channel;

const rabbitmq = {
    connect: async () => {
        const connection = await amqp.connect(process.env.RABBITMQ_URL)
        channel = await connection.createChannel()

        await channel.assertExchange('service_events', 'direct', { durable: true });
        await channel.assertQueue('service_query_queue', { durable: true });
        await channel.bindQueue('service_query_queue', 'service_events', 'service.query');
    },

    handleServiceQueries: async () => {
        if(!channel) await rabbitmq.connect()

        channel.consume('service_query_queue', async (msg) => {
            if(!msg) return;
            try {
                const { service_code, correlationId, replyTo } = JSON.parse(msg.content.toString());
                const services = await serviceRepo.getallservices();
                const service = services.find(s => s.service_code === service_code);

                channel.sendToQueue(replyTo, Buffer.from(JSON.stringify({
                    success: !!service,
                    service: service || null
                })), { correlationId });

                channel.ack(msg);
            } catch (err) {
                console.error('rpc error')
                channel.nack(msg, false, false)
            }
        })
    }
}

module.exports = rabbitmq;