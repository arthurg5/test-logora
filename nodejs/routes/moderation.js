const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/predict', async (req, res) => {
  const { text, language } = req.body;
  try {
    const response = await axios.get('https://moderation.logora.fr/predict', {
      params: { text, language },
    });
    const prediction = response.data.prediction['0'];
    res.json({ prediction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting the prediction.' });
  }
});

router.post('/score', async (req, res) => {
  const { text, language } = req.body;
  try {
    const response = await axios.post('https://moderation.logora.fr/score', {
      text,
      language,
    });
    const score = response.data.score;
    res.json({ score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting the score.' });
  }
});

module.exports = router;
