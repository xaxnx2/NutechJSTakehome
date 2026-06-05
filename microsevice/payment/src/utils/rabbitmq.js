const amqp = require('amqplib')
const balanceRepo = require('../repositories/balancerepo')
require('dotenv').config();
let channel;


const rabbitmq = {
    connect: async () => {
        const connection = await amqp.connect(process.env.RABBITMQ_URL)
        channel = await connection.createChannel()

        await channel.assertExchange('user_events', 'direct', { durable: true });
        
        await channel.assertQueue('balance_queue', { durable: true });
        
        await channel.bindQueue('balance_queue', 'user_events', 'user.created');
    },

    consumerPayment : async () => {
        if (!channel) await rabbitmq.connect()
        
        channel.consume('balance_queue', async (msg) => {
            if(!msg) return;

            try{
                const data = JSON.parse(msg.content.toString()) 
                await balanceRepo.createBalance(data.user_id)

                channel.ack(msg)
            } catch(err){
                channel.nack(msg, false, false)

            }
        })
    },
}

module.exports = rabbitmq