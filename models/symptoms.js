var Sequelize = require('sequelize');
var model = require('../config/connection.js');
var symptoms = model.define('symptoms', {
    id: {
        type: Sequelize.STRING,
    },
    sym_name: {
    	type: Sequelize.STRING,
    }
});
module.exports = symptoms;