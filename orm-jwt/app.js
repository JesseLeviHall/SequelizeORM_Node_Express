const express = require('express');
const Sequelize = require('sequelize');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const asyncHandler = require('express-async-handler');

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 8000;

const dbpass = process.env.MYSQL_PASS;

// connect to database
const sequelize = new Sequelize('orm_jwt', 'root', `${dbpass}`, {
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
			unique: true,
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

app.post(
	'/signup',
	asyncHandler(async (req, res) => {
		const { name, email, password } = req.body;
		const plainpass = password.toString();
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(plainpass, salt);
		const userExists = await User.findOne({
			where: { email: email },
		});

		if (!userExists) {
			try {
				await User.create({
					name,
					email,
					password: hashedPassword,
				});
				res.status(200).json({ message: 'User created successfully' });
			} catch (error) {
				res.status(500).json(error);
				console.log(error);
			}
		} else {
			res.status(400).json({ message: 'User already exists' });
		}
	})
);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
