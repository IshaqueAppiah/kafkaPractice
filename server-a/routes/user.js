const express = require('express');
const { sendUserMessage } = require('../kafkaProducer');

const router = express.Router();

router.post('/create', async (req, res) => {
  const { name, email } = req.body;
  

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    await sendUserMessage({ name, email });
    res.status(200).json({ message: 'User sent to Kafka.' });
  } catch (err) {
    console.error('❌ Failed to send message:', err.message);
    res.status(500).json({ error: 'Kafka message failed.' });
  }
});

module.exports = router;
