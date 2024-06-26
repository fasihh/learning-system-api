const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db');

const app = express();

db.connect();

const userRouter = require('./api/routes/user');

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/user', userRouter);

app.use((error, req, res, next) => res.status(error.status || 500).json({ error: { message: error.message } }));

module.exports = app;
