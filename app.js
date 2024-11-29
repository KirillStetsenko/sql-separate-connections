const mysql = require('mysql2/promise');

config = {
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'test',
};

query = 'SELECT * FROM products';

let connection;

const connect = async () => {
	try {
		connection = await mysql.createConnection(config);
		console.log('Connected!');
	} catch (error) {
		console.log('Connection Error!');
		throw error;
	}
};

const getQuery = async (query) => {
	try {
		if (!connection) {
			throw new Error('No database to connect. Try connect() first.');
		}
		const data = await connection.execute(query);
		return data[0];
	} catch (error) {
		console.log('Error get Query!');
		throw error;
	}
};

const disconnect = async () => {
	try {
		if (connection) {
			await connection.end();
			console.log('Disconnected!');
		} else {
			console.log('Connect with database already disconnected!');
		}
	} catch (error) {
		console.log('Disconnect Error!');
		throw error;
	}
};

(async () => {
	try {
		await connect();
		const result = await getQuery(query);
		console.log(result);
	} catch (error) {
		console.log('Error in database');
	} finally {
		await disconnect();
	}
})();
