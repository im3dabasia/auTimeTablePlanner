const mongoose = require('mongoose')

const connectToDataBase = () => {
    mongoose
        .connect('mongodb+srv://im3dabasia:3387@cluster0.tm0gjgr.mongodb.net/STTP?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        .then(() => {
            console.log("Connected with Database");
            
        });
};

module.exports = connectToDataBase;