const express = require('express');
const connectDB = require('./DB/connect');
require('dotenv').config();

const app = express();
const port = 7000;




const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`server is listen at ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();


