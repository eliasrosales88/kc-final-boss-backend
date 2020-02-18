"use strict";
class Publisher {
  async publishIMGPath(queueName, connectionPromise, imagePath) {
    try {
      // AMQP server connection
      const conn = await connectionPromise;
      // create connection channel
      const channel = await conn.createChannel(); // con esto voy a hablar con las colas

      // Ensure queue exist
      await channel.assertQueue(queueName, {
        durable: true // la cola sobrevive a reinicios del broker
      });

      let sendAgain = true;

      // Send image path as a message
      const image = {
        path: imagePath
      };

      // Check before send another
      if (!sendAgain) {
        console.log("Esperando a");
        await new Promise(resolve =>
          channel.on("drain", () => {
            resolve;
          })
        );
        await new Promise(resolve =>
          channel.on("drain", () => {
            resolve;
          })
        );
      }

      sendAgain = channel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(image)),
        {
          persistent: true // el mensaje sobrevive a reinicios del broker (rabbitmq es el broker).
        }
      );
      console.log(`La ruta ${image.path} se ha enviado ${sendAgain}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}
module.exports = new Publisher();
