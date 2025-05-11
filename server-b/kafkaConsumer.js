const sqlite3 = require('sqlite3').verbose();
const db = require('./db');

const { Kafka } = require('kafkajs');
const kafka = new Kafka({
  clientId: 'test-consumer',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'test-group' });

let isConsumerRunning = false;

const run = async () => {
  if (isConsumerRunning) {
    console.log('⚠️ Consumer already running. Skipping start.');
    return;
  }

  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const data = JSON.parse(message.value.toString());
        console.log('📥 Kafka received:', data);

        const insertQuery = `INSERT INTO users (name, email) VALUES (?, ?)`;
        db.run(insertQuery, [data.name, data.email], function (err) {
          if (err) {
            console.error('❌ DB insert error:', err.message);
          } else {
            console.log('✅ Inserted into DB with ID:', this.lastID);
          }
        });
      } catch (err) {
        console.error('❌ Error processing message:', err.message);
      }
    }
  });

  isConsumerRunning = true;
};

module.exports = { startConsumer: run };
