const http = require('http');
const process = require('process');
const app = require('./src/app');

const { testConnection } = require('./src/services/db');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
	try {
		await testConnection();
	} catch (error) {
		console.error(error);
	}
}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

startServer();
