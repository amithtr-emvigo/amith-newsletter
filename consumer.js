
const userService = require("./services/userService");


const config = require("./config.json");

const q ='newsletter_main_queue';

const q_url = config.amqp_url ? config.amqp_url : 'amqp://localhost';

const amqplib = require('amqplib');



amqplib.connect(q_url).then( function(conn) {
              process.once('SIGINT', function() { conn.close(); });
              return conn.createChannel().then(function(ch) {

                var ok = ch.assertQueue(q, {durable: false});

                ok = ok.then(function(_qok) {
                  return ch.consume(q, async function(msg) {
               
                    let data=  JSON.parse(msg.content.toString());
                    console.log(" [x] Received '%s'", data);

                    // Send newsletter email
                    await userService.sendMail(data);

                  }, {noAck: true});
                });

                return ok.then(function(_consumeOk) {
                  console.log(' [*] Waiting for messages. To exit press CTRL+C');
                });
              });
            }).catch(console.warn);