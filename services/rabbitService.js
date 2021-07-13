
const config = require("../config.json");

const q ='newsletter_main_queue';

const q_url= config.amqp_url ? config.amqp_url : 'amqp://localhost';

const amqplib = require('amqplib');



module.exports.addNewsletterToRabbitQueue = async (json_data) => {
    try {
        console.log("Inside addNewsletterToRabbitQueue");
        const conn = await amqplib.connect(q_url);
        const ch   = await conn.createChannel();
        await ch.assertQueue(q, {durable: false});
        

        for(i=0; i<json_data.length ;i++){

             console.log(json_data[i])

             data= JSON.stringify(json_data[i]);
             
             response=  await ch.sendToQueue(q, Buffer.from(data));
             console.log("sendto q res ",response)

        }
        await conn.close();
        console.log("sendToQueue Success");
        return true

    } catch (err) {
        console.log("Unexpected errors:", err);
        throw err;
    }

}




