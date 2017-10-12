module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		name: DataTypes.String,
		phone: DataTypes.Integer,
		gender: DataTypes.String,
		age: DataTypes.Integer
	});
	return User;
}