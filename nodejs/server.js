const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/moderation/predict', async (req, res) => {
  const { text, language } = req.body;

  try {
    const response = await axios.get('https://moderation.logora.fr/predict', {
      params: { text, language },
    });

    const probability = response.data.prediction[0];

    res.send({ probability });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while making the prediction.' });
  }
});

app.post('/api/moderation/score', async (req, res) => {
  const { text, language } = req.body;

  try {
    const response = await axios.post('https://moderation.logora.fr/score', {
      text,
      language,
    });

    const score = response.data.score;

    res.send({ score });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while calculating the score.' });
  }
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
