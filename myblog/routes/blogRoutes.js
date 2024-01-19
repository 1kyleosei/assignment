const express = require('express');
const router = express.Router();
const db = require('../database');

// Route to display all blog posts
router.get('/', async (req, res, next) => {
    try {
        const rows = await db.getAllPosts();
        res.render('index', { posts: rows });
    } catch (err) {
        next(err); // Pass the error to the next middleware or error handler
    }
});

// Route to display the form for a new blog post
router.get('/new', (req, res) => {
    res.render('new');
});

// Route to add a new blog post
router.post('/', async (req, res, next) => {
    const { title, content } = req.body;

    try {
        console.log("Received POST request for a new blog post");
        console.log("Title:", title);
        console.log("Content:", content);

        // Use db.db.run instead of db.run
        await db.db.run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);
        console.log("Blog post saved successfully");

        res.redirect('/blogs');
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

module.exports = router;
