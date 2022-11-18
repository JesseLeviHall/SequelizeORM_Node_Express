const express = require('express');
const Sequelize = require('sequelize');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 8000;

const dbpass = process.env.MYSQL_PASS;
const jDubSecret = process.env.JWT_SECRET;

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

//signup
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
				//get the new user
				const newUser = await User.findOne({
					where: { email: email },
				});
				//gen a session token
				const generateToken = (newUser) => {
					return JWT.sign({ id: newUser.id }, `${jDubSecret}`, {
						expiresIn: '3d',
					});
				};
				//return user and login token
				res.status(200).json({
					id: newUser.id,
					name: newUser.name,
					email: newUser.email,
					token: generateToken(newUser),
				});
			} catch (err) {
				res.status(500).json(err);
				console.log(err);
			}
		} else {
			res.status(400).json({ message: 'User already exists' });
		}
	})
);

//login
app.post(
	'/login',
	asyncHandler(async (req, res) => {
		const { email, password } = req.body;
		const user = await User.findOne({
			where: { email: email },
		});
		const generateToken = (user) => {
			return JWT.sign({ id: user.id }, `${jDubSecret}`, {
				expiresIn: '3d',
			});
		};
		if (user && (await bcrypt.compare(password, user.password))) {
			res.status(200).json({
				id: user.id,
				name: user.name,
				email: user.email,
				token: generateToken(user),
			});
		} else {
			res.status(401);
			throw new Error('Invalid credentials');
		}
	})
);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
