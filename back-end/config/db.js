const mongoose = require('mongoose')
require("dotenv").config() 

// process.env.MONGO_URL is a variable that connects the appliaction to the database hosted Online: Mongodb Atlas Clusters
const connectToDataBase = () => {
    mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        .then(() => {
            console.log("Connected with Database");
            
        });
};

module.exports = connectToDataBase;