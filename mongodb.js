const {MongoClient, ObjectId} = require('mongodb');
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

    // db.collection('users').insertMany([
    //     {age: 28, name: 'Jen'},
    //     {age: 29, name: 'Gunther'},
    //     {age: 46, name: 'Larry'},
    //     ])
    //     .then((error, result) => {
    //         if (error) {
    //             return console.log(error);
    //         }
    //
    //         console.log(result);
    //     });

    //
    // db.collection('users').findOne({ _id: new ObjectId('5ef27d715703362338b67141') }, (error, user) => {
    //     if (error) {
    //         return console.error('Could not fetch');
    //     }
    //
    //     console.log(user);
    // });
    //
    // db.collection('users').findOne({ name: 'Jen', age: 1 }, (error, user) => {
    //     if (error) {
    //         return console.error('Could not fetch');
    //     }
    //
    //     console.log(user);
    // });

    // db.collection('users').find({age: 27}).toArray((error, users) => {
    //     console.log(users);
    // });
    //
    // db.collection('users').find({age: 27}).count((error, count) => {
    //     console.log(count);
    // });

    // Find last task by ID.
    // db.collection('tasks').findOne({_id: new ObjectId('5ef27cfb91791322d68b77bc')}, (error, task) => {
    //     if (error) {
    //         return console.error("Can't fetch data");
    //     }
    //
    //     console.log(task);
    // });
    //
    // db.collection('tasks').find({ completed: true}).toArray((error, tasks) => {
    //     if (error) {
    //         return console.error("Can't fetch data");
    //     }
    //
    //     console.log(tasks);
    // });

    // db.collection('users').updateOne(
    //     {_id: new ObjectId('5f05ee882f8e27a0bd946395')},
    //     {
    //         $inc: {
    //             age: 1
    //         }
    //     })
    //     .then(result => console.log(result))
    //     .catch(error => console.log(error));

    // db.collection('tasks').updateMany({completed: false}, {$set: {completed: true}})
    //     .then(result => console.log(result))
    //     .catch(error => console.log(error));

    // db.collection('users').deleteMany({age: 28})
    //     .then(result => console.log(result.deletedCount))
    //     .catch(error => console.log(error));
    //
    db.collection('tasks').deleteOne({description: 'Go to store'})
        .then(result => console.log(result.deletedCount))
        .catch(error => console.log(error));
});


