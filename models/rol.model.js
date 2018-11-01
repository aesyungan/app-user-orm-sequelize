'use strict'
module.exports = (sequelize, Sequelize) => {
    const Rol = sequelize.define('rol', {
        id_rol: {
            type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        }
    });
    return Rol;
}