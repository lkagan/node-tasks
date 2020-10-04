const Task = require('../src/models/task')
require('../src/db/mongoose')

// Task.findByIdAndRemove('5f6409a4468d34681d334c5a')
//     .then((task) => {
//         console.log(task)
//         return Task.count({completed: false})
//     })
//     .then((count) => console.log(count + ' incomplete items'))
//     .catch((e) => console.log(e))

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndRemove(id)
    return await Task.countDocuments({ completed: false })
}

deleteTaskAndCount('5f67fc29258e0d4f60692fdc')
    .then(count => console.log(count))
    .catch(e => console.log(e))