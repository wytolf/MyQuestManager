const axios = require('axios');
const sinon = require('sinon');
const server = require('../server');
const request = require('supertest');
const expect = require('chai').expect;


const sandbox = sinon.createSandbox();
describe('Gateway API Tests', () => {
    afterEach(() => {
      sandbox.restore();
    });
    const userData = { email: 'test@mail.ch', role: 'user', activeQuests: [] };
    const questData = { questId: 1, title: 'Questtitle', trader: 'trader', map: 'map', link: 'www.link.com' };

    describe('register a user', () => {
        it('should send the user to the microservice', async () => {
            const axiosPutStub = sandbox.stub(axios, 'put');
            axiosPutStub.resolves({ status: 200 });

            const res = await request(server).put('/api/register').send(userData);

            expect(res.status).to.equal(200);
        });
    });

    describe('get quests', () => {
        it('should get the quests from the microservice', async () => {
            const axiosGetStub = sandbox.stub(axios, 'get');
            axiosGetStub.resolves({ status: 200, data: [] });

            const res = await request(server).get('/api/quests');

            expect(res.status).to.equal(200);
        });
    });

    describe('post a quest', () => {
        it('should send the quest to the microservice', async () => {
            const axiosPostStub = sandbox.stub(axios, 'post');
            axiosPostStub.resolves({ status: 200 });

            const res = await request(server).post('/api/quests').send(questData);

            expect(res.status).to.equal(200);
        });
    });

    describe('get a quest by id', () => {
        it('should get the quest from the microservice', async () => {
            const axiosGetStub = sandbox.stub(axios, 'get');
            axiosGetStub.resolves({ status: 200, data: [] });

            const res = await request(server).get('/api/quests/1');

            expect(res.status).to.equal(200);
        });
    });

    describe('get all users', () => {
        it('should get all users from the microservice', async () => {
            const axiosGetStub = sandbox.stub(axios, 'get');
            axiosGetStub.resolves({ status: 200, data: [] });

            const res = await request(server).get('/api/user');

            expect(res.status).to.equal(200);
        });
    });

    describe('post a user', () => {
        it('should send the user to the microservice', async () => {
            const axiosPostStub = sandbox.stub(axios, 'post');
            axiosPostStub.resolves({ status: 200 });

            const res = await request(server).post('/api/user').send(userData);

            expect(res.status).to.equal(200);
        });
    });

    describe('get a user by email', () => {
        it('should get the user from the microservice', async () => {
            const axiosGetStub = sandbox.stub(axios, 'get');
            axiosGetStub.resolves({status: 200, data: []});

            const res = await request(server).get('/api/user/test@mail.ch');

            expect(res.status).to.equal(200);
        });
    });

    //ToDo: add tests for /api/user*
});






