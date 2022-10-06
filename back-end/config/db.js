const mongoose = require('mongoose')

const connectToDataBase = () => {
    mongoose
        .connect('mongodb://localhost:27017/sttp', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected with Database");
        });
};

module.exports = connectToDataBase;