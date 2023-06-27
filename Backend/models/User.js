const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    } ,// String is shorthand for {type: String}
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default:Date.now
        
    }
});
const user = mongoose.model('user', userSchema)
module.exports = user