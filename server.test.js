// Importing necessary libraries
const request = require('supertest');
const app = require('./server.js');

// Testing group for the root endpoint
describe('GET /', () => {
    // Test case: Check if the root endpoint returns a 200 status code (OK)
    it('should return 200 OK', (done) => {
        request(app) // Making a request using the imported app instance
            .get('/') // Using GET method for the root endpoint
            .expect(200, done); // Expecting a 200 OK status code
    });
});

// Testing group for the search API endpoint
describe('GET /api/search', () => {
    // Test case: Check if the endpoint returns a 400 status code for missing search term
    it('should return 400 Bad Request for missing term', (done) => {
        request(app)
            .get('/api/search') // Making a GET request without a term parameter
            .expect(400, done); // Expecting a 400 Bad Request status code
    });

    // Test case: Check if the endpoint returns a 400 status code for an invalid media type
    it('should return 400 Bad Request for invalid media type', (done) => {
        request(app)
            .get('/api/search?term=test&media=invalidMedia') // Making a GET request with an invalid media type
            .expect(400, done); // Expecting a 400 Bad Request status code
    });

    // Test case: Check if the endpoint returns valid data for a correct search request
    it('should return data for a valid search', (done) => {
        request(app)
            .get('/api/search?term=test&media=all') // Making a GET request with a valid term and media type
            .expect(200) // Expecting a 200 OK status code
            .expect('Content-Type', /json/) // Expecting the response content type to be JSON
            .then(response => {
                // Inside the promise, checking if the response body contains valid data
                expect(response.body.results).toBeDefined(); // Checking if results are defined in the response
                expect(response.body.totalResults).toBeDefined(); // Checking if totalResults are defined in the response
                done(); // Indicate the end of the test
            });
    });
});
