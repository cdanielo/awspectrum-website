import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  it('/api/health (GET) should return a health status', async () => {
    const res = await request(app.getHttpServer()).get('/api/health').expect(200);
    expect(['ok', 'degraded']).toContain(res.body.status);
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

  it('/api/contact (POST) should reject extra fields (forbidNonWhitelisted)', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/contact')
      .send({
        type: 'newsletter',
        name: 'Test',
        email: 'test@test.com',
        role: 'ADMIN',
      })
      .expect(400);

    expect(res.body).toHaveProperty('statusCode', 400);
  });

  it('/api/users (GET) should require authentication', async () => {
    await request(app.getHttpServer()).get('/api/users').expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
