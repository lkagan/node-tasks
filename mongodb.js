const { MongoClient, ObjectId } = require('mongodb');
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'node-tasks';

MongoClient.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (error, client) => {
    if (error) {
        return console.error('Unable to connect to database.');
    }

    const db = client.db(databaseName);

    db.collection('users').findOne({ name: 'Jen' }, (error, user) => {
        if (error) {
            return console.error('Could not fetch');
        }

        console.log(user);
    });

    db.collection('users').findOne({ name: 'Jen', age: 1 }, (error, user) => {
        if (error) {
            return console.error('Could not fetch');
        }

        console.log(user);
    });


});