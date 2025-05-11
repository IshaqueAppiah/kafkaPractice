const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'test-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello from Node.js Kafka producer!' }
    ]
  });
 
};

async function sendUserMessage(user) {
  await producer.send({
    topic: 'test-topic',
    messages: [{ value: JSON.stringify(user) }],
  });
  console.log('📤 Sent Kafka message:', user);
}


module.exports = {
  connectProducer,
  sendUserMessage,
};