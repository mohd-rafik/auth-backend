const mongoose = require('mongoose');
require('dotenv').config();
const connection = mongoose.connect(process.env.CONNECTIONSTRING).then((value) => {
    console.log(`Db is Connected!!`);
});

module.exports = connection;