const request = require('supertest');
const { app, startServer, closeServer } = require('../app');

let server;

beforeAll(async () => {
  server = await startServer(0); // Use port 0 to let the OS assign a free port
});

afterAll(async () => {
  await closeServer();
});

describe('gae_node_request_example', () => {
  describe('GET /', () => {
    it('should get 200', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
    });

    it('should get Hello World', async () => {
      const response = await request(app).get('/');
      expect(response.text).toBe('Hello, World!');
    });
  });
});
