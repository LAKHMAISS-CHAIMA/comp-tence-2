import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';

describe('API Rendu', () => {
  let server;
  beforeAll(async () => {
    server = app.listen(4001);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  let renduId;

  it('crée un nouveau rendu', async () => {
    const res = await request(server)
      .post('/rendus')
      .send({
        apprenantId: new mongoose.Types.ObjectId(),
        briefId: '1',
        description: 'Mon rendu',
      });
    expect(res.statusCode).toBe(201);
    renduId = res.body._id;
  });

  it('récupère la liste des rendus', async () => {
    const res = await request(server).get('/rendus');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('récupère un rendu par ID', async () => {
    const res = await request(server).get(`/rendus/${renduId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(renduId);
  });

  it('supprime un rendu', async () => {
    const res = await request(server).delete(`/rendus/${renduId}`);
    expect(res.statusCode).toBe(204);
  });
});
