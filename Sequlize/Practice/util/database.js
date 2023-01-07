const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "myfavoritepassword", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;