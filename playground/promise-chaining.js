require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('5f62a9a53a256be28489db5d', {age: 1})
    .then((user) => {
        console.log(user)
        return User.countDocuments({age: 1})
    })
    .then((count) => console.log(count))
    .catch((e) => console.log(e))