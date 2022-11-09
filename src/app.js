const express = require('express');

const app = express();

app.use(express.json());

app.get('/server', (req, res, next) => {
	res.json({ message: 'Hello World!' });
	next();
});

app.get('/server/login', (req, res, next) => {
	res.json({ message: 'Hello from login endpoint!' });
	next();
});

module.exports = app;
