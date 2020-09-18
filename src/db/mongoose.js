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
        trim: true,
    },
    age: {
        type: Number,
        default: 0,
        validate: (value) => {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        validate: (value) => {
            if (! validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6,
        validate: (value) => {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password can not contain the word "password"');
            }
        }

    }
});

// const me = new User({
//     name: '   Larry ',
//     email: 'ME@LARRYKAGAN.COM  '
// });
//
// me.save()
//     .then(() => console.log(me))
//     .catch(error => console.log('Error', error));

// const user = new User({
//     name: 'John Doe',
//     email: 'test@test.com',
//     password: 'testing123'
// });
//
// user.save()
//     .then(_ => console.log(user))
//     .catch(error => console.log(error));

const Task = mongoose.model('Task', {
    completed: {
        type: Boolean,
        required: false,
        default: false,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    }
});

// const myTask = new Task({completed: false });
const myTask = new Task({description: '      Go to store again     '});

myTask.save()
    .then((myTask) => console.log('Added task', myTask))
    .catch((e) => console.log(e));
