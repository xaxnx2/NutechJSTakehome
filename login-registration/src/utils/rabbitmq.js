const amqp = require('amqplib')
require('dotenv').config();
let channel;

 
const rabbitmq = {
    connect:  async () => {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel()
        await channel.assertExchange('user_events','direct',{durable: true})
    },

    publishUserCreated: async (userId) => {
        if (!channel) await rabbitmq.connect();
        channel.publish(
            'user_events',
            'user.created',
            Buffer.from(JSON.stringify({ user_id: userId }))
        );
    }
}


module.exports = rabbitmq