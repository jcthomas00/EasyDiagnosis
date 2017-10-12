var Sequelize = require('sequelize');
var model = require('../config/connection.js');
var diagnosis = model.define('symptoms', {
	diagnosis_id: {
        type: Sequelize.STRING,
    }
});
module.exports = diagnosis;