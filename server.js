const express = require('express');
const app = express();
const cors = require('cors');
const Router = require('./routes/index')
const moment = require('moment');
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

app.use('/v1', Router);

app.get('/', (req,res) => {
    res.json({
        message: 'server running',
        serverTime: moment.utc(new Date()).local().format('YYYY-MM-DD HH:mm:ss'),
    });
});

app.get('*', (req,res) => {
    res.status(400).send('not found')
});

module.exports = app;
