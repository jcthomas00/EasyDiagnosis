module.exports = function(sequelize, DataTypes) {
	var Request = sequelize.define("User", {
		searchText: DataTypes.STRING
	});
	return Request;
}