const Sequelize = require('sequelize');
const db = require('../services/db');

const Model = sequelize.Model;

class User extends Model {
	static init(sequelize, DataTypes) {
		return super.init(
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
	}
}

module.exports = User;
