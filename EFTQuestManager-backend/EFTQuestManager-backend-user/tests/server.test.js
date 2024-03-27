// const axios = require('axios');
// const { server } = require('../server'); // Pfad zu Ihrer Serverdatei

// describe('POST /user', () => {
//     it('should send the user to the microservice', async () => {
//         const user = { name: 'Test User', email: 'testuser@example.com' };
//
//         // Starten Sie den Server vor dem Test
//         server.listen(4555);
//
//         const response = await axios.post('http://localhost:4556/user', user);
//
//         expect(response.status).toBe(200);
//         expect(response.data).toBe('User erfolgreich an den Microservice gesendet');
//
//         // Beenden Sie den Server nach dem Test
//         server.close();
//     });
// });


const request = require('supertest');
const express = require('express');
const app = express();

// Mock Firebase-Funktionen
jest.mock('firebase-admin', () => ({
    initializeApp: jest.fn(),
    getFirestore: jest.fn(),
    setDoc: jest.fn(),
}));

// Mock Express-Endpunkt
app.post('/api/user', require('./userController'));

describe('POST /api/user', () => {
    it('should create a new user', async () => {
        const mockRequest = {
            body: {
                email: 'test@example.com',
                username: 'testuser',
                role: 'user',
                quests: ['quest1', 'quest2'],
            },
        };

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await request(app).post('/api/user').send(mockRequest.body);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith(
            'user with id test@example.com saved.'
        );
    });

    it('should handle errors', async () => {
        const mockRequest = {
            body: {
                email: 'test@example.com',
                username: 'testuser',
                role: 'user',
            },
        };

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        // Simulate an error during database save
        jest.spyOn(app.locals.db, 'setDoc').mockRejectedValue(new Error('DB error'));

        await request(app).post('/api/user').send(mockRequest.body);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith(
            'User Service: POST /user -> Internal Server Error'
        );
    });
});
