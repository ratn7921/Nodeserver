// Import necessary modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mysql = require('mysql2'); // Using mysql2 for better performance
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for CORS
const corsOptions = {
    origin: process.env.ALLOWED_ORIGIN || '*', // Allow specific origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
    credentials: true,
};
app.use(cors(corsOptions)); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('MySQL connected successfully');
});

// Unsplash API endpoint
app.post('/api/search', async (req, res) => {
    const query = req.body.query; // Get search query from request body

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        // Fetch photos from Unsplash API
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: {
                query: query,
                client_id: process.env.UNSPLASH_ACCESS_KEY, // Access Key from .env
                page: 1,
                per_page: 10,
            },
        });

        // Store search results in MySQL if needed
        const photos = response.data.results;

        // Example: Insert photos into MySQL
        const sql = 'INSERT INTO photos (id, description, url) VALUES ?';
        const values = photos.map(photo => [photo.id, photo.description || null, photo.urls.small]);
        
        db.query(sql, [values], (err) => {
            if (err) {
                console.error('Error inserting photos:', err);
                return res.status(500).json({ error: 'Error storing photos in database' });
            }
        });

        res.json(photos); // Send response back to client
    } catch (error) {
        console.error('Error fetching photos:', error);
        res.status(500).json({ error: 'Error fetching photos from Unsplash' }); // Handle error
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
