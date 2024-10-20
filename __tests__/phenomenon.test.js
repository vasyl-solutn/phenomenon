const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const Phenomenon = require('../models/phenomenon');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Phenomenon.deleteMany({});
});

describe('Phenomenon API', () => {
  it('should create a new phenomenon', async () => {
    const res = await request(app)
      .post('/api/phenomena')
      .send({
        title: 'Test Phenomenon'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Phenomenon');
  });

  it('should get all phenomena', async () => {
    await Phenomenon.create({ title: 'Phenomenon 1' });
    await Phenomenon.create({ title: 'Phenomenon 2' });

    const res = await request(app).get('/api/phenomena');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  // Add more tests for get, update, and delete operations
});
