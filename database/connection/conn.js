const Sequelize = require('sequelize');

const conn = new Sequelize('postgres://clinnygee:cCxG0DxZ@127.0.0.1:5432/instant-messenger');

module.exports = conn;