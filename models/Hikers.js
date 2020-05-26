module.exports = function(sequelize, DataTypes) {
    const Hikers = sequelize.define('Hikers', {
                name: DataTypes.STRING,
                age: DataTypes.INTEGER,
                hiker_type: DataTypes.STRING,
                fav_hikes: DataTypes.STRING,
                experience: DataTypes.STRING,
                fun_fact: DataTypes.STRING,
                email: DataTypes.STRING,
                username: DataTypes.STRING,
                password: DataTypes.STRING
    });

    return Hikers;
}