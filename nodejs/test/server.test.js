const request = require('supertest');
const app = require('../app');

describe('Server', () => {
  afterAll(() => {
    app.close();
  });

  describe('POST /api/moderation/predict', () => {
    it('returns a probability', async () => {
      const response = await request(app)
        .post('/api/moderation/predict')
        .send({ text: 'Grosse pute!', language: 'fr' });

      expect(response.statusCode).toEqual(200);
      expect(response.body.prediction['0']).toBeGreaterThan(0.5);
    });
  });

  describe('POST /api/moderation/score', () => {
    it('returns a score', async () => {
      const response = await request(app)
        .post('/api/moderation/score')
        .send({ text: 'Grosse pute!', language: 'fr' });

      expect(response.statusCode).toEqual(200);
      expect(response.body.score).toBeDefined();
    });
  });
});
