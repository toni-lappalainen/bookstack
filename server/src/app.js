const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.options('*', cors());

// MIDDLEWARE
app.use(express.json());

// === ROUTERS ===
// Different requests are send here to correct places
// right now we only have books database, so this is the only router we need.
const bookRouter = require('./routes/bookRoutes');

app.use('/books', bookRouter);

module.exports = app;
