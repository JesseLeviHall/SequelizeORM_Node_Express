const express = require('express');
const appRoutes = require('./routes');

const app = express();

app.use(express.json());

app.use('/server', appRoutes);

module.exports = app;
