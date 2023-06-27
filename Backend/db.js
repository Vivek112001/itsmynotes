const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/itsmynotes"

const connectToMongo = async () => {
    try {
        mongoose.connect(mongoURI)
        console.log("connected to mongo succesfully")

    }
    catch (error) {
        console.log(error)
    }
}
module.exports = connectToMongo; 