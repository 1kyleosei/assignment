const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./blog.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Creates the 'posts' table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (createTableErr) => {
            if (createTableErr) {
                console.error(createTableErr.message);
            } else {
                console.log('Table "posts" created or already exists.');
            }
        });
    }
});

// Adds a function to get data
const getAllPosts = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM posts ORDER BY created_at DESC', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports = {
    db,
    getAllPosts, // Exports the function to get data
};
