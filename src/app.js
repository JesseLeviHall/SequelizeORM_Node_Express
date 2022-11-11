const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const { sequelize } = require('./services/db');

const app = express();

app.use(express.json());

const Model = Sequelize.Model;
class User extends Model {}
User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM('active', 'inactive'),
		},
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
		updatedAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
	},
	{
		sequelize,
		modelName: 'User',
		timestamps: false,
	}
);

sequelize.sync();

app.get('/server', (req, res, next) => {
	res.json({ message: 'Hello World!' });
	next();
});

app.get('/server/login', (req, res, next) => {
	res.json({ message: 'Hello from login endpoint!' });
	next();
});

module.exports = app;
