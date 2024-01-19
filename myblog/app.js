// Imports required modules
const express = require('express');
const app = express();
const blogRoutes = require('./routes/blogRoutes');
const db = require('./database');

// Sets up the view engine and body parser middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Serves static files from the "public" directory
app.use(express.static('public'));

// Redirects root to /blogs
app.get('/blogs', async (req, res) => {
    try {
        console.log('Reached /blogs route');

        const rows = await db.getAllPosts(); // Use the function to retrieve data
        console.log('Retrieved data:', rows);

        res.render('index', { posts: rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});



// Uses the blogRoutes for /blogs
app.use('/blogs', blogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
