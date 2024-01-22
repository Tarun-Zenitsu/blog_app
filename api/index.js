import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from '../api/routes/user.route.js'
import authRoutes from '../api/routes/auth.route.js'

dotenv.config();

mongoose.connect(process.env.MONGOOSE_URL).
then(() => {
    console.log('database is connected')
})
.catch((err) => {
    console.log(err);
})

const app = express();
app.use(express.json())


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500 ;
    const message = err.message || 'Internal server error'
    res.statusCode(statusCode).json({
        susccess: false,
        statusCode,
        message
    })
})


app.listen(3000, () => {
    console.log("app is running on port 3000");
})