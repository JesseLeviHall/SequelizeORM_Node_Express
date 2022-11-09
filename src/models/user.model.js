const Sequelize = require('sequelize');

const db = require('../services/db');

const User = db.sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	status: {
		type: Sequelize.ENUM('1', '0'),
		defaultValue: '1',
	},
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
	},
	updatedAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
	},
});
