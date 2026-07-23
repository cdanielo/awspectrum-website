import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  it('/api/contact (POST) should accept a submission', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/contact')
      .send({
        type: 'newsletter',
        name: 'Test',
        email: 'test@test.com',
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('test@test.com');
  });

  afterAll(async () => {
    await app.close();
  });
});
