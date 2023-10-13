const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_DB_USR,
    process.env.MYSQL_DB_PW,
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

sequelize.define("Task", {
    task_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
    }
})

sequelize.sync().then(() => {
    console.log('Tasks table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 