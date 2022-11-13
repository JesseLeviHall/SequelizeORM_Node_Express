const express = require('express');
const router = express.Router();

const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const { sequelize } = require('./services/db');

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
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true,
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

//create user
router.post('/signup', async (req, res) => {
	try {
		await User.sync();
		await User.create(req.body);
		res.status(200).json({ message: 'user created successfully' });
	} catch (err) {
		res.status(500).json(err);
		console.log(err);
	}
});

//get all users
router.get('/users', async (req, res) => {
	try {
		const users = await User.findAll();
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json(err);
		console.log(err);
	}
});

//get user by id
router.get('/users/:id', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
		console.log(err);
	}
});

//update user by id
router.put('/users/:id', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		await user.update(req.body);
		res.status(200).json({ message: 'user updated successfully' });
	} catch (err) {
		res.status(500).json(err);
		console.log(err);
	}
});

//delete user by id
router.delete('/users/:id', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		await user.destroy();
		res.status(200).json({ message: 'user deleted successfully' });
	} catch (err) {
		res.status(500).json(err);
		console.log(err);
	}
});

module.exports = router;
