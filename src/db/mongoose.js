const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

const isObjectIDValid = (_id) => {
    return mongoose.Types.ObjectId.isValid(_id)
}

module.exports = isObjectIDValid