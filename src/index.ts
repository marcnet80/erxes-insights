import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as xss from 'xss';

// load environment variables
dotenv.config();

import { connect } from './connection';
import { debugBase, debugInit } from './debuggers';
import { initConsumer } from './messageQueue';

connect();

initConsumer();

const app = express();

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Error handling middleware
app.use((error, _req, res, _next) => {
  var msg = filterXSS(error.message);
  debugBase(`Error: `, msg);
  res.status(500).send(msg);
});

const { PORT } = process.env;

app.listen(PORT, () => {
  debugInit(`Insights server is running on port ${PORT}`);
});