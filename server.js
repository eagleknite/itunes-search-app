// Required dependencies
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const axios = require('axios');

// Set up an Express application
const app = express();
// Define the default port or get it from environment variables
const PORT = process.env.PORT || 5000;

// Use helmet middleware to help secure Express apps by setting various HTTP headers
app.use(helmet());

// Use CORS middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// Default route to check server status
app.get('/', (req, res) => {
    res.send('Server is up and running');
});

// API endpoint to handle search functionality
app.get('/api/search', async (req, res) => {
    const { term, media = 'all', limit = 500, page = 1, genre, sort } = req.query;

    // Validate the search term
    if(!term) {
        return res.status(400).send({ error: 'Search term is required' });
    }

    // Validate the media type
    const validMediaTypes = ['movie', 'podcast', 'music', 'audiobook', 'shortFilm', 'tvShow', 'software', 'ebook', 'all'];
    if(!validMediaTypes.includes(media)) {
        return res.status(400).send({ error: 'Invalid media type' });
    }

    // Construct the iTunes API URL
    const iTunesAPIURL = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=${media}&limit=${limit}`;

    try {
        const response = await axios.get(iTunesAPIURL);
        let results = response.data.results;
        const totalResults = response.data.resultCount;

        // Filter results by genre if provided
        if(genre) {
            results = results.filter(item => item.primaryGenreName === genre);
        }

        // Sort the results based on the provided sorting option
        if(sort) {
            // Various sorting methods
            if (sort === 'releaseDate') {
                results.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
            } else if (sort ==='trackPrice') {
                results.sort((a, b) => b.trackPrice - a.trackPrice)
            } else if (sort === 'primaryGenreName') {
                results.sort((a, b) => a.primaryGenreName.localeCompare(b.primaryGenreName))
            } else if (sort === 'artistName') {
                results.sort((a, b) => a.artistName.localeCompare(b.artistName))
            } else if (sort === 'collectionName') {
                results.sort((a, b) => a.collectionName.localeCompare(b.collectionName))
            }
        }

        // Paginate the results
        const itemsPerPage = 50;
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedResults = results.slice(startIndex, startIndex + itemsPerPage);

        // Send the response with paginated results
        return res.send({
            totalResults,
            resultCount: paginatedResults.length,
            results: paginatedResults
        });
    } catch (error) {
        // Log and handle errors when fetching data from the iTunes API
        console.error("Error fetching from iTunes API:", error.message);
        if (error.response) {
            console.error("Error response from iTunes API:", error.response.data);
        }
        return res.status(500).send({ error: 'Failed to fetch data from iTunes API' });
    }
});

// Export the app for external usage (e.g., in tests or another server setup)
module.exports = app; 

// Start the server on the defined PORT
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
