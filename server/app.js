const express = require('express');
const connectDB = require('./DB/connect');
require('dotenv').config();
const testRoute = require('./routes/user.route.js')
const authRoute = require('./routes/auth.route.js')

const cors = require('cors')

const app = express();
const port = 7000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',  
    credentials: true,
  }));

app.use('/api/v2', testRoute);
app.use('/api/v2/auth', authRoute);


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

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})