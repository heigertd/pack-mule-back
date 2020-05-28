const bcrypt = require('bcrypt');

//FIXME: check validation for usernames etc.

module.exports = function(sequelize, DataTypes) {
    const Hikers = sequelize.define('Hikers', {
                name: DataTypes.STRING,
                age: DataTypes.INTEGER,
                hiker_type: DataTypes.STRING,
                fav_hikes: DataTypes.STRING,
                experience: DataTypes.STRING,
                fun_fact: DataTypes.STRING,
                email:{
                    type:DataTypes.STRING,
                    unique: true
                }, 
                username:{
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },         
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate:{
                        len:[8]
                    }
                }
    });
    Hikers.beforeCreate(function(hiker){
        hiker.password = bcrypt.hashSync(hiker.password, bcrypt.genSaltSync(10), null);
    });
    return Hikers;
}