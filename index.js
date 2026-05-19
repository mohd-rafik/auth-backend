const express = require('express');
const app = express();
require('dotenv').config();

require('./src/config/db');
const PORT = process.env.PORT || 7000;
const authroutes = require('./src/routes/authroutes');
app.use(express.json());
app.use('/api/v1', authroutes);

app.get('/', async (req, res) => {
    return res.status(200).json({
        message: "Welcome To Auth Backend"
    })
})

app.listen(PORT, async (req, res) => {
    console.log(`Server is Running on PORT ${PORT}`);
})