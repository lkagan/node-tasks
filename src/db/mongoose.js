const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
});

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//     },
//     age: {
//         type: Number,
//     },
// });
//
// const me = new User({
//     name: 'Larry',
//     age: 46,
// });
//
// me.save()
//     .then(() => console.log(me))
//     .catch(error => console.log('Error', error));

const Task = mongoose.model('Task', {
    completed: {type: Boolean},
    description: {type: String}
});

const myTask = new Task({completed: false, description: 'Go to store'});

myTask.save()
    .then((myTask) => console.log('Added task', myTask))
    .catch((e) => console.log(e));
