
const userService = require("./services/userService");

const config = require("./config.json");

var q ='newsletter_main_queue';

var q_url = config.amqp_url ? config.amqp_url : 'amqp://localhost';

var amqplib = require('amqplib');



amqplib.connect(q_url).then(function(conn) {
              process.once('SIGINT', function() { conn.close(); });
              return conn.createChannel().then(function(ch) {

                var ok = ch.assertQueue(q, {durable: false});

                ok = ok.then(function(_qok) {
                  return ch.consume(q, function(msg) {
                    console.log(" [x] Received '%s'", msg.content.toString());
                  }, {noAck: true});
                });

                return ok.then(function(_consumeOk) {
                  console.log(' [*] Waiting for messages. To exit press CTRL+C');
                });
              });
            }).catch(console.warn);