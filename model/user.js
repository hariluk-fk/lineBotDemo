const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phoneNo: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    idCard: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('user', userSchema);
