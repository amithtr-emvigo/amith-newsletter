
const config = require("../config.json");

const q_url= config.amqp_url ? config.amqp_url : 'amqp://localhost';

const amqplib = require('amqplib');



module.exports.addNewsletterToRabbitQueue = async (json_data, queue_name) => {
    try {
        console.log("Inside addNewsletterToRabbitQueue");
        const conn = await amqplib.connect(q_url);
        const ch   = await conn.createChannel();
        await ch.assertQueue(queue_name, {durable: false});
        
        json_data.forEach(async (item)=>{
            console.log("item==>>>>",item)
            response=  await ch.sendToQueue(queue_name, Buffer.from(JSON.stringify(item)));
            console.log("sendto q response ",response)
         });

       // await conn.close();
        console.log("sendToQueue Success");
        return true

    } catch (err) {
        console.log("Unexpected errors:", err);
        throw err;
    }

}




