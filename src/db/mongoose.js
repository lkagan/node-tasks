const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        validate: (value) => {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    email: {
        type: String,
        required: true,
        validate: (value) => {
            if (! validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    }
});

const me = new User({
    name: 'Mike',
    email: 'mike@',
});

me.save()
    .then(() => console.log(me))
    .catch(error => console.log('Error', error));

// const Task = mongoose.model('Task', {
//     completed: {type: Boolean},
//     description: {type: String}
// });
//
// const myTask = new Task({completed: false, description: 'Go to store'});
//
// myTask.save()
//     .then((myTask) => console.log('Added task', myTask))
//     .catch((e) => console.log(e));
