const request = require('supertest');
const app = require('./server.js');

describe('GET /', () => {
    it('should return 200 OK', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    });
});

describe('GET /api/search', () => {
    it('should return 400 Bad Request for missing term', (done) => {
        request(app)
            .get('/api/search')
            .expect(400, done);
    });

    it('should return 400 Bad Request for invalid media type', (done) => {
        request(app)
            .get('/api/search?term=test&media=invalidMedia')
            .expect(400, done);
    });

    it('should return data for a valid search', (done) => {
        request(app)
            .get('/api/search?term=test&media=all')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(response => {
                expect(response.body.results).toBeDefined();
                expect(response.body.totalResults).toBeDefined();
                done();
            });
    });
});

