import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module'; // 앱 모듈 경로에 맞게 수정할 것

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    const user = {
        email: 'testuser@example.com',
        password: 'TestPassword123',
        nickname: '테스트유저',
    };

    it('POST /auth/register - should register a new user', async () => {
        const res = await request(app.getHttpServer())
            .post('/auth/register')
            .send(user)
            .expect(201);

        expect(res.body).toEqual({ message: '회원가입이 완료되었습니다.' });
    });

    it('POST /auth/login - should login successfully', async () => {
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: user.email, password: user.password })
            .expect(201);

        expect(res.body).toHaveProperty('accessToken');
        expect(res.body).toHaveProperty('refreshToken');
    });

    it('POST /auth/register - should fail on duplicate email', async () => {
        const res = await request(app.getHttpServer())
            .post('/auth/register')
            .send(user)
            .expect(409);

        expect(res.body.message).toBe('이미 존재하는 이메일입니다.');
    });

    it('POST /auth/login - should fail with incorrect password', async () => {
        await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: user.email, password: 'wrongpassword' })
            .expect(401);
    });
});
