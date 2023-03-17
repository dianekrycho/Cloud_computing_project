// Import the necessary modules
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL for the MongoDB instance
const url = 'mongodb://mongo:27017';

// Name of the database
const dbName = 'mydatabase';

// Sample user data
const users = [
    { username: 'user1', password: 'password1', role: 'admin' },
    { username: 'user2', password: 'password2', role: 'user' },
    { username: 'user3', password: 'password3', role: 'user' },
];

// Path to the JSON data file
const jsonDataPath = 'Backend/lieux-de-tournage-a-paris.json';

// Use fs module to read the JSON data from file
const jsonData = JSON.parse(fs.readFileSync(jsonDataPath, 'utf8'));

// Use MongoClient to connect to the MongoDB instance
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);

    console.log('Connected successfully to server');

    const db = client.db(dbName);

    // Insert the user data into the 'users' collection
    db.collection('users').insertMany(users, function(err, result) {
        assert.equal(null, err);

        console.log(`${result.insertedCount} users inserted`);

        // Insert the JSON data into the 'data' collection
        db.collection('data').insertMany(jsonData, function(err, result) {
            assert.equal(null, err);

            console.log(`${result.insertedCount} documents inserted`);

            // Close the connection
            client.close
        });
    });
});