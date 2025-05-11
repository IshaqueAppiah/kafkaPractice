// routes/users.js
const { Router } = require('express');
const db = require('../db');
const { startConsumer } = require('../kafkaConsumer');

const router = Router();

router.get('/all', async(req, res) => {
  await startConsumer();
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Add this route to trigger the Kafka consumer
router.post('/start-consumer', async (req, res) => {
  try {
    await startConsumer();
    res.status(200).json({ message: 'Kafka consumer started' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
