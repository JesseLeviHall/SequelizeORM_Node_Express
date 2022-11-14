const express = require('express');
const Sequelize = require('sequelize');
const JWT = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 8000;

const dbpass = process.env.MYSQL_PASS;

// connect to database
const sequelize = new Sequelize('node_orm', 'root', `${dbpass}`, {
	dialect: 'mysql',
	host: 'localhost',
});
async function testConnection() {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}
testConnection();

// define model
const User = sequelize.define(
	'tbl_users',
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING(50),
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING(150),
			allowNull: false,
		},
		status: {
			type: Sequelize.INTEGER,
			defaultValue: 1,
		},
	},
	{
		timestamps: false,
		modelName: 'User',
	}
);

User.sync();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
