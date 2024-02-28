const request = require('supertest');
const app = require('../app');

describe('Moderation API', () => {
  afterAll(() => {
    app.close();
  });

  it('should reject content with hate speech', async () => {
    const response = await request(app)
      .post('/api/moderation/predict')
      .send({ text: 'I hate you', language: 'en' });

    expect(response.statusCode).toEqual(200);
    expect(response.body.prediction['0']).toBeGreaterThan(0.5);
  });

  it('should accept content without hate speech', async () => {
    const response = await request(app)
      .post('/api/moderation/predict')
      .send({ text: 'I love you', language: 'en' });

    expect(response.statusCode).toEqual(200);
    expect(response.body.prediction['0']).toBeLessThan(0.5);
  });
});
