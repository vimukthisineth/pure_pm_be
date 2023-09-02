require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
var cors = require('cors')

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
    schedules.db_check();
})
const app = express();

app.use(cors());
app.use(express.json());

const routes = require('./routes/routes');
const schedules = require('./schedules/schedules');
const updateDataController = require('./controllers/update_data');

app.use('/api', routes)

app.listen(8080, () => {
    console.log(`Server Started at ${8080}`)
})
