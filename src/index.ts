import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';

// load environment variables
dotenv.config();

import { connect } from './connection';
import { debugBase, debugInit } from './debuggers';
import { initConsumer } from './messageQueue';

connect();

initConsumer();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Error handling middleware
app.use((error, _req, res, _next) => {
  debugBase(`Error: `, error.message);
  res.status(500).send(error.message);
});

const { PORT } = process.env;

app.listen(PORT, () => {
  debugInit(`Insights server is running on port ${PORT}`);
});