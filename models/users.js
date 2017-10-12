var Sequelize = require('sequelize');
var model = require('../config/connection.js');
var users = model.define('symptoms', {
		email: {
			type: Sequelize.STRING,
		}
		password: {
			type: Sequelize.STRING,
		}
		name: {
			type: Sequelize.STRING,
		}
		phone: {
			type: Sequelize.STRING,
		}
		gender: {
			type: Sequelize.STRING,
		}
		age: {
			type: Sequelize.INTEGER,
		}
	});
}
module.exports = users;