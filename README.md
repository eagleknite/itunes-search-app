
# iTunes Search App Backend

## Description

This is the backend service for the iTunes Search App. The backend is built using Node.js and Express, and it provides an API endpoint for searching iTunes content. It also sets up the necessary middleware for security and CORS handling.

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes bundled with Node.js)

### Installation

1. Clone the repository:

```bash
git clone [https://github.com/eagleknite/itunes-search-app] itunes-search-app
cd itunes-search-app
```

2. Install the required dependencies:

```bash
npm install
```

## 

### Running the App

- To start the server:

```bash
npm run server
```

- To start both the server and the client concurrently (if you have a client-side application in the `client` folder):

```bash
npm run dev
```

### Available Scripts

- `npm start`: Starts the server.
- `npm run client`: Starts the client-side application (this work if you add `client` directory, to the `itunes-search-app` directory).
- `npm test`: Runs the Jest tests.
- `npm run dev`: Runs both the server and the client concurrently.

## Dependencies

- **axios**: Used for making HTTP requests.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **express**: Framework for building the web server.
- **helmet**: Helps secure Express apps by setting various HTTP headers.

### Dev Dependencies

- **concurrently**: Allows for running multiple npm scripts concurrently.
- **jest**: JavaScript testing framework.
- **supertest**: HTTP assertion library.

## API Endpoints

- `GET /`: Default endpoint to check server status.
- `GET /api/search`: Endpoint to search iTunes content based on provided query parameters.

## Link to the deployed api

- [iTunes Search App Backend](https://itunes-search-app-ifbi.onrender.com/)

## Author

Arnold Twala

## License

This project is licensed under the ISC License.
