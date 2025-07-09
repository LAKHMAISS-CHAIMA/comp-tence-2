import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';

describe('API Apprenant', () => {
  let server;
  beforeAll(async () => {
    server = app.listen(4000);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  let apprenantId;

  it('crée un nouvel apprenant', async () => {
    const res = await request(server)
      .post('/apprenants')
      .send({ name: 'Testeur', email: 'testeur@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Testeur');
    apprenantId = res.body._id;
  });

  it('récupère la liste des apprenants', async () => {
    const res = await request(server).get('/apprenants');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('récupère un apprenant par ID', async () => {
    const res = await request(server).get(`/apprenants/${apprenantId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(apprenantId);
  });

  it('supprime un apprenant', async () => {
    const res = await request(server).delete(`/apprenants/${apprenantId}`);
    expect(res.statusCode).toBe(204);
  });
});
