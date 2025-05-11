// server.js
const express = require('express');
const usersRouter = require('./routes/user');
const { connectProducer } = require('./kafkaProducer');

const app = express();
app.use(express.json());
app.use('/users', usersRouter);

const PORT = 4000;

(async () => {
  try {
    await connectProducer();
    app.listen(PORT, () => {
      console.log(`🚀 Producer server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
  }
})();
