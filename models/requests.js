var Sequelize = require('sequelize');
var model = require('../config/connection.js');
var requests = model.define('symptoms', {
	searchText: {
        type: Sequelize.STRING,
    }
});
module.exports = requests;