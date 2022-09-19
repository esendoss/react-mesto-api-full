/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { createUser, login } = require('./controllers/user');
const auth = require('./middlewares/auth');
const { centralError } = require('./middlewares/centralError');
const { validateLogin, validateRegister } = require('./middlewares/validation');
const { requestLogger, errorLoger } = require('./middlewares/logger');
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const wayRouter = require('./routes/wrongway');

const { PORT = 3001 } = process.env;

const app = express();

const options = {
  origin: [
    'https://anotherdomain.esendoss.students.nomoredomains.sbs',
    'http://anotherdomain.esendoss.students.nomoredomains.sbs',
    'https://esendoss.students.nomoredomains.sbs',
    'http://esendoss.students.nomoredomains.sbs',
    'http://localhost:3001',
    'http://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
};

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateRegister, createUser);
app.post('/signin', validateLogin, login);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true });

app.use('*', cors(options));
app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);
app.use(wayRouter);

app.use(errorLoger);

app.use(errors());
app.use(centralError);

app.listen(PORT);
