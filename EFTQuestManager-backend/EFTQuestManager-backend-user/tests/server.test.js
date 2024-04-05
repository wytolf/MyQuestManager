const axios = require('axios');
const sinon = require('sinon');
const server = require('../server');
const request = require('supertest');
const expect = require('chai').expect;


const sandbox = sinon.createSandbox();
describe('Quest-Service API Tests', () => {
    afterEach(() => {
        sandbox.restore();
    });
    const userData = { email: 'test@mail.ch', role: 'user', activeQuests: [] };

    describe('put user', () => {
        it('should send the user to the microservice', async () => {
            const axiosPutStub = sandbox.stub(axios, 'put');
            axiosPutStub.resolves({status: 200});

            const res = await request(server).put('/api/user').send(userData);

            expect(res.status).to.equal(200);
        });
    });

    describe('get users', () => {
        it('should get the users from the microservice', async () => {
            const axiosGetStub = sandbox.stub(axios, 'get');
            axiosGetStub.resolves({status: 200, data: []});

            const res = await request(server).get('/api/user');

            expect(res.status).to.equal(200);
        });
    });

    describe('get user by id', () => {
        it('should get the user from the microservice', async () => {
            const axiosGetStub = sandbox.stub(axios, 'get');
            axiosGetStub.resolves({status: 200, data: []});

            const res = await request(server).get('/api/user/test@mail.ch');

            expect(res.status).to.equal(200);
        });
    });
});