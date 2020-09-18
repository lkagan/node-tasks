const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
});


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
