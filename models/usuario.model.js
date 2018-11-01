'use strict'
module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('usuario', {
        id_usuario: {
            type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        edad: {
            type: Sequelize.INTEGER
        }
    });
    return Usuario;
}