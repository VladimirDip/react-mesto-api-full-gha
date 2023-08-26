require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
// const cors = require('./middlewares/cors');/**/
const { requestLogger, errorLogger } = require('./middlewares/logger');

const routes = require('./routes');
const serverError = require('./middlewares/serverError');

const app = express();
app.use(cors());

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

mongoose.connect(DB_URL, {
  useUnifiedTopology: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(requestLogger);
app.use(limiter);
app.use(routes);
// app.use(cors);

app.use(errorLogger);
app.use(errors());
app.use(serverError);

app.listen(PORT);
