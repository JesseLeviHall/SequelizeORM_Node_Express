// instantiate sequelize
const Sequelize = require('sequelize');

// connect to database
const sequelize = new Sequelize('node_orm', 'root', 'Gogogon1', {
	dialect: 'mysql',
	host: 'localhost',
});

// test connection
async function testConnection() {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

// export connection
module.exports = { sequelize, testConnection };
