const db = require('../models/user.model');

//adduser
const addUser = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const user = await db.User.create({
			name,
			email,
			password,
		});

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	addUser,
};
